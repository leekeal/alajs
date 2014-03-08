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
		var config = core.config;
		config('appPath',path.join(core.rootPath ,core.appName));
		config('configPath',path.join(config('appPath'),'config'))
		config('views',path.join(config('appPath'),config('viewsPath')||'views'));
		config('view engine',config('viewEngine'));
		config('controllerPath',path.join(config('appPath'),config('controllerPath')||'controllers'));
		config('modelPath',path.join(config('appPath'),config('modelPath')||'models'));
		config('publicFloder',path.join(core.rootPath,config('publicFloder')||'public'))
		config('routerFile',path.join(config('appPath'),config('routerFile')||'router.js'));


		var modulesInfo = require(path.join(config('configPath'),'modules.conf'))
		config('modules',modulesInfo);

		

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

