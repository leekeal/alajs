var path = require('path');


exports = module.exports = configuration


function configuration(app,bootNext){
	app.paths.config = app.paths.app +'/config';
	var configPath = app.paths.config+'/app.conf'

	var config = loadCofing()
	if (config) setConfig(config);  /*设置配置文件*/
	defaultConfig();

	bootNext();


	function defaultConfig(){
		var appPath = app.paths.app;
		console.log(appPath);
		app.set('view engine', 'hbs');
		app.set('controllers',path.join(appPath,app.get('controllers')||'controllers'));
		app.set('views',path.join(appPath,app.get('views')));
		app.set('models',path.join(appPath,app.get('models')||'models'));
		app.set('routerFile',path.join(appPath,app.get('routerFile')||'routerFile'));
		console.info(app.get('views'));
	}



	function loadCofing(){

		try {
			return  require(configPath);
		}catch(err){
			console.error('配置文件不存在'+configPath);
			return null
		}

	}


	function setConfig(config){


		/*设置通用配置*/
		for(var iteam in config['general']){
			app.set(iteam,config['general'][iteam]);
		}

		/*设置各模式的特殊配置*/
		var env = config.general.env;
		for(var iteam in config[env]){
			app.set(iteam,config[env][iteam]);
		}

	}



}