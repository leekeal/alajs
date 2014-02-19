var path = require('path');



module.exports = function(core){
	
	setConfig();
	setPath();
	
	function getConfig(){
		var configPath = path.join(core.rootPath,core.appName,'/config/app.conf')

		try {
			return require(configPath);
		}catch(err){
			return require('./defaultConfig');// alajs.echoError('配置文件文件不存在' + configPath)
		}
	}

	function setPath(){
		core.set('appPath',path.join(core.rootPath ,core.appName));
		core.set('views',path.join(core.get('appPath'),core.get('viewsPath')||'views'));
		core.set('view engine',core.get('viewEngine'));
		core.set('controllerPath',path.join(core.get('appPath'),core.get('controllerPath')||'controllers'));
		core.set('modelPath',path.join(core.get('appPath'),core.get('modelPath')||'models'));
		core.set('publicFloder',path.join(core.rootPath,core.get('publicFloder')||'public'))

	}

	function setConfig(){
		alajs.echoInfo('(1) configuration success');
		var config = getConfig();

		/*设置通用配置*/
		for(var iteam in config['general']){
			core.set(iteam,config['general'][iteam]);
		}

		/*设置各模式的特殊配置*/
		var env = config.general.env;
		for(var iteam in config[env]){
			core.set(iteam,config[env][iteam]);
		}


	}

}

