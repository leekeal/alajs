var path = require('path');
var ala;
var app;
module.exports = function(core,bootNext){
	var customRoute = require(core.config('routerFile'));
	customRoute.before(core,core.controllers); /*设置自定义路由*/
	
	autoRoute();  /*自动路由,优先级较高*/
	customRoute.after(core,core.controllers); /*设置自定义路由*/


	alajs.echoInfo('路由设置成功');
	bootNext();/*进入下一个启动环节*/

	function autoRoute(){
		var ctrls = core.controllers;

		for(var ctrlName in ctrls){
			var ctrl = ctrls[ctrlName];
			for(var actionName in ctrl['get']){
				setRoute(ctrl,ctrlName,actionName,'get')
			}
			for(var actionName in ctrl['post']){
				setRoute(ctrl,ctrlName,actionName,'post')
			}
			for(var actionName in ctrl['put']){
				setRoute(ctrl,ctrlName,actionName,'put')
			}
			for(var actionName in ctrl['del']){
				setRoute(ctrl,ctrlName,actionName,'delete')
			}
		}
	}

	function setRoute(ctrl,ctrlName,actionName,method){
		var action = ctrl[method][actionName];
		if (actionName == 'index') {
			var urlPath = path.join('/',ctrlName);
			core.route(method,urlPath,action)
			console.log(method.toString().red + ': ' + urlPath.toString()+ ' ===> ' + ctrlName.toString() + '.'+actionName.toString());
		}
		else{
			var urlPath = path.join('/',ctrlName,actionName);
			core.route(method,urlPath,action)
			console.log(method.toString().green + ': ' + urlPath.toString()+ ' ===> ' + ctrlName.toString() + '.'+actionName.toString());
		}
		
	}


}


