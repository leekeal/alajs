/**
 * Module dependencies.
 */
/*
*通过修改这个session中间了解了，这个session 中间是把session 对象转换成buffer存在在cookie里面的。
*所以session只能存储一些基本信息，如果存储大量，数据，降导致cookie数据过大，浪费流量
*/
var debug = require('debug')('koa-session');
var Keygrip = require("keygrip");
/**
 * Initialize session middleware with `opts`:
 *
 * - `key` session cookie name ["koa:sess"]
 * - all other options are passed as cookie options
 *
 * @param {Object} [opts]
 * @api public
 */

module.exports = function(opts){
  opts = opts || {};

  // key
  var key = opts.key || 'koa:sess';

  // defaults
  if (null == opts.overwrite) opts.overwrite = true;
  if (null == opts.httpOnly) opts.httpOnly = true;
  if (null == opts.signed) opts.signed = true;

  debug('session options %j', opts);

  return function *(next){
    var sess, json;

    // to pass to Session()
    this.sessionOptions = opts;
    this.sessionKey = key;

    this.__defineGetter__('session', function(){
      // already retrieved
      if (sess) return sess;

      // unset
      if (false === sess) return null;

      json = this.cookies.get(key, opts);

      if (json) {
        debug('parse %s', json);
        try {
          sess = new Session(this, decode(json));
        } catch (err) {
          // backwards compatibility:
          // create a new session if parsing fails.
          // new Buffer(string, 'base64') does not seem to crash
          // when `string` is not base64-encoded.
          // but `JSON.parse(string)` will crash.
          if (!(err instanceof SyntaxError)) throw err;
          sess = new Session(this);
        }
      } else {
        debug('new session');
        sess = new Session(this);
      }

      return sess;
    });

    this.__defineSetter__('session', function(val){
      if (null == val) return sess = false;
      if ('object' == typeof val) return sess = new Session(this, val);
      throw new Error('this.session can only be set as null or an object.');
    });

    var err;
    try {
      yield *next;
    } catch (_err) {
      err = _err;
    }

    if (undefined === sess) {
      // not accessed
    } else if (false === sess) {
      // remove
      this.cookies.set(key, '', opts);
    } else if (!json && !sess.length) {
      // do nothing if new and not populated
    } else if (sess.changed(json)) {
      // save
      sess.save();
    }

    // rethrow any downstream errors
    if (err) throw err;
  }
};

/**
 * Session model.
 *
 * @param {Context} ctx
 * @param {Object} obj
 * @api private
 */

function Session(ctx, obj) {
  this._ctx = ctx;
  if (!obj) this.isNew = true;
  else for (var k in obj) this[k] = obj[k];
}

/**
 * JSON representation of the session.
 *
 * @return {Object}
 * @api public
 */

Session.prototype.inspect =
Session.prototype.toJSON = function(){
  var self = this;
  var obj = {};

  Object.keys(this).forEach(function(key){
    if ('isNew' == key) return;
    if ('_' == key[0]) return;
    obj[key] = self[key];
  });

  return obj;
};

/**
 * Check if the session has changed relative to the `prev`
 * JSON value from the request.
 *
 * @param {String} [prev]
 * @return {Boolean}
 * @api private
 */

Session.prototype.changed = function(prev){
  if (!prev) return true;
  this._json = encode(this);
  return this._json != prev;
};

/**
 * Return how many values there are in the session object.
 * Used to see if it's "populated".
 *
 * @return {Number}
 * @api public
 */

Session.prototype.__defineGetter__('length', function(){
  return Object.keys(this.toJSON()).length;
});

/**
 * populated flag, which is just a boolean alias of .length.
 *
 * @return {Boolean}
 * @api public
 */

Session.prototype.__defineGetter__('populated', function(){
  return !!this.length;
});

/**
 * Save session changes by
 * performing a Set-Cookie.
 *
 * @api private
 */

Session.prototype.save = function(){
  var ctx = this._ctx;
  var json = this._json || encode(this);
  var opts = ctx.sessionOptions;
  var key = ctx.sessionKey;

  var cookie = new Cookie(key, json, opts);
  var sessionSig = ctx.cookies.keys.sign(cookie.toString());
  
  ctx.sessionId = json;
  ctx.sessionSig = sessionSig;


  debug('save %s', json);
  ctx.cookies.set(key, json, opts);
};

/**
 * Decode the base64 cookie value to an object.
 *
 * @param {String} string
 * @return {Object}
 * @api private
 */

function decode(string) {
  var body = new Buffer(string, 'base64').toString('utf8');
  return JSON.parse(body);
}

/**
 * Encode an object into a base64-encoded JSON string.
 *
 * @param {Object} body
 * @return {String}
 * @api private
 */

function encode(body) {
  body = JSON.stringify(body);
  return new Buffer(body).toString('base64');
}



function Cookie(name, value, attrs) {
  value || (this.expires = new Date(0))

  this.name = name
  this.value = value || ""

  for (var name in attrs) this[name] = attrs[name]
}

Cookie.prototype = {
  path: "/",
  expires: undefined,
  domain: undefined,
  httpOnly: true,
  secure: false,
  overwrite: false,

  toString: function() {
    return this.name + "=" + this.value
  },

  toHeader: function() {
    var header = this.toString()

    if (this.maxage) this.expires = new Date(Date.now() + this.maxage);

    if (this.path     ) header += "; path=" + this.path
    if (this.expires  ) header += "; expires=" + this.expires.toUTCString()
    if (this.domain   ) header += "; domain=" + this.domain
    if (this.secure   ) header += "; secure"
    if (this.httpOnly ) header += "; httponly"

    return header
  }
}