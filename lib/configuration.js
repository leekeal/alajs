var path = require('path');



module.exports = function(core,bootNext){
	setConfig();  /*设置配置文件*/
	editPath();   /*编辑相对路径为绝对路径路径*/
	alajs.echoInfo('配置文件加载成功');
	bootNext()
	
	function getConfig(){
		var configPath = path.join(core.rootPath,core.appName,'/config/app.conf')

		try {
			return  require(configPath);
		}catch(err){
			return require('./defaultConfig');// alajs.echoError('配置文件文件不存在' + configPath)
		}

	}

	function editPath(){

		core.config('appPath',path.join(core.rootPath ,core.appName));
		core.config('views',path.join(core.config('appPath'),core.config('viewsPath')||'views'));
		core.config('view engine',core.config('viewEngine'));
		core.config('controllerPath',path.join(core.config('appPath'),core.config('controllerPath')||'controllers'));
		core.config('modelPath',path.join(core.config('appPath'),core.config('modelPath')||'models'));
		core.config('publicFloder',path.join(core.rootPath,core.config('publicFloder')||'public'))
		core.config('routerFile',path.join(core.config('appPath'),core.config('routerFile')||'router.js'));

		

	}

	function setConfig(){
		var config = getConfig();

		/*设置通用配置*/
		for(var iteam in config['general']){
			core.config(iteam,config['general'][iteam]);
		}

		/*设置各模式的特殊配置*/
		var env = config.general.env;
		for(var iteam in config[env]){
			core.config(iteam,config[env][iteam]);
		}

	}

}

