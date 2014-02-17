var path = require('path');


var ala;
var app;

module.exports = function(core){
	ala = core;
	app = ala.express;
	
	setConfig();
	setPath();
	
}

function getConfig(){
	var configPath = path.join(ala.rootPath,ala.appName,'/config/app.conf')

	try {
		return require(configPath);
	}catch(err){
		// alajs.echoError('配置文件文件不存在' + configPath)
		return require('./defaultConfig');
	}
}

function setPath(){
		app.set('appPath',path.join(ala.rootPath ,ala.appName));
		app.set('views',path.join(app.get('appPath'),app.get('viewsPath')||'views'));
		app.set('view engine',app.get('viewEngine'));
		app.set('controllerPath',path.join(app.get('appPath'),app.get('controllerPath')||'controllers'));
		app.set('publicFloder',path.join(ala.rootPath,app.get('publicFloder')||'public'))

}

function setConfig(){
	alajs.echoInfo('(1) configuration success');
	var config = getConfig();
	for (var env in config){
		for(var index in config[env]){
			if(env == "general"){
				app.configure(function(){
					app.set(index,config[env][index]);
				})
			}
			else{
				app.configure(env,function(){
					app.set(index,config[env][index]);
				})
			}
		}
	}
}

