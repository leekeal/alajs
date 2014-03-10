var path = require('path')
var koa = require('koa');
var merge = require('merge-descriptors');

var definer = require('./definer');




exports = module.exports = define_mvc;

// define_mvc.prototype.__proto__ =  new koa()  /*继承koa*/



function define_mvc(){
	// if (!(this instanceof define_mvc)) return new define_mvc;
	/*自己创建自己，如果判断是自己了，就停止创建，执行下面的代码，不做判断的话，会无线循环，提示Maximum call stack size exceeded*/
	// global.define = this.definer = new definer();  /*实例化 definer,并占用全局名称 define */
	// this.definer.modules = this.modules = {}  /*修改difner的modules 指向 this.modules*/
	// this.rootPath = path.dirname(require.main.filename);




}


exports.server = defineServer 


defineServer.prototype.__proto__ =  new koa()
function defineServer(){



}


merge(exports,new definer())










exports.version = 0.1
/*

alajs.prototype.__proto__.__proto__.__proto__    
                  koa        koa.prototype          Emitter.prototype
app.__proto__.__proto__.__proto__.__proto__             
			    koa       koa.prototype     Emitter.prototype
			    */




