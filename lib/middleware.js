var path = require('path');
var express = require('express'); 

var flash = require('connect-flash');




module.exports = function(core,bootNext){
	alajs.MongoStore = require('connect-mongo')(express);

	alajs.favicon = express.favicon(path.join(core.config('publicFloder'),'static','favicon.ico'));
	// core.use(express.bodyParser()); /*用json 和 urlencoded取代了bodyParser*/
	alajs.logger = express.logger(core.config('logger'));
	alajs.json = express.json();
	alajs.urlencoded = express.urlencoded();
	alajs.methodOverride = express.methodOverride();
	alajs.cookieParser = express.cookieParser('test');
	alajs.session =  express.session;
	alajs.flash = flash();
	alajs.router = core.express.router;
	alajs.directory = express.directory(core.config('publicFloder'));
	alajs.static = express.static(core.config('publicFloder'))
	

	var middlewareConfig = require(path.join(core.rootPath,core.appName,'/config/middleware.conf'));
	middlewareConfig(core);


	alajs.echoInfo('路由中间件设置成功');
	bootNext()
	
}

