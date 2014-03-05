var path = require('path');
var express = require('express'); 
var MongoStore = require('connect-mongo')(express);
var flash = require('connect-flash');

/*var alaAuth = require('ala-auth');
var mongoose = require('mongoose');*/


module.exports = function(core,bootNext){
	
	core.use(express.favicon(path.join(core.config('publicFloder'),'favicon.ico')));
	// core.use(express.bodyParser()); /*用json 和 urlencoded取代了bodyParser*/
	core.use(express.logger(core.config('logger')));
	core.use(express.json());
	core.use(express.urlencoded());
	core.use(express.methodOverride());

	core.use(express.cookieParser('test'));
	core.use(express.session({
		cookie:{maxAge:60000},
		secret:"alajs",
		store:new MongoStore({
			url:core.config('database')+'/sessions'
		})
	}));

	// core.use(alaAuth.db(mongoose));/*权限验证*/

	core.use(flash());


	core.use(core.express.router);
	/*静态文件，文件夹管理器*/
	if (core.config('directory')) {
		core.use(express.directory(core.config('publicFloder')))
	}

	core.use(express.static(core.config('publicFloder')));
	/*404*/
	core.use(function(req, res, next){
		res.status(404);
		res.send('<h1>你所访问的页面不存在</h1>');
	});

	alajs.echoInfo('路由中间件设置成功');
	bootNext()
	
}

