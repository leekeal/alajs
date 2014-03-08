var path = require('path');
var Boot = require('./bootMiddleware');

var middleware = require('./middleware');
var configuration = require('./configuration');
/*加载器*/
var loadCtrl = require('./loadHandler/ctrl');
var router = require('./loadHandler/router');

var viewHandler = require('./viewHandler');
var db = require('./db');

var core
var boot
module.exports = function(coreOrigin){
	core = coreOrigin
	boot = new Boot(core);
	loadApp(boot)/*先加载根程序*/
	boot.use(createServer)
	boot.start()

	

}






function moduleHandler(core,bootNext){
	core.modules = {};
	var modules = core.config('modules');
	var appPath = core.config('appPath');

	for(var index in modules){
		var m = modules[index];
		try{

			var mPath = path.join(appPath,m.path);
			var mConfig = require(path.join(mPath,'config','module.conf'))

			core.modules[m.name] = {}
			/*设置绝对路径*/
			core.modules[m.name].config = {
				viewsPath:path.join(mPath,mConfig.viewsPath),
				controllerPath:path.join(mPath,mConfig.controllerPath),
				routerFile:path.join(mPath,mConfig.routerFile),
			}
		}
		catch(err){
			console.error('模块配置文件不存在');
			throw err;
		}
		loadModule(m.name);
	}

	bootNext();
}






function loadModule(mName){
	loadCtrl(core,mName);
}


function loadApp(boot){
	
	boot.use(configuration)
	boot.use(db);
	boot.use(viewHandler)
	boot.use(middleware)  /*必须在控制器加载之前，控制器中会用到flash中间件*/
	boot.use(loadCtrl)
	boot.use(moduleHandler)
	boot.use(router)
	
}




function createServer(core,bootNext){
	core.config('port',process.env.PORT || core.config('port'));
	core.express.listen(core.config('port'));
	console.log("[Server Start]listen on --->".success+" http://127.0.0.1:".red+core.config('port').toString().red);
	bootNext()
}