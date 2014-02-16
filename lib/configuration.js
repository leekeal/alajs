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
	return require(path.join(ala.rootPath ,ala.appName,'/config/app.conf'));
}

function setPath(){
	app.set('appPath',path.join(ala.rootPath ,ala.appName));
	app.set('views',path.join(app.get('appPath'),app.get('views')));
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

