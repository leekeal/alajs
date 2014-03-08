var path = require('path');

var core
module.exports = function(coreOrigin,bootNext){
	core = coreOrigin
	var customRoute = require(core.config('routerFile'));
	customRoute.before(core,core.controllers); /*设置自定义路由*/
	
	configRouter()
	customRoute.after(core,core.controllers); /*设置自定义路由*/


	alajs.echoInfo('路由设置成功');
	bootNext();/*进入下一个启动环节*/

	


}



function configRouter(){
	var appCtrls = core.controllers;
	autoRoute(appCtrls,'');  /*App路由*/

	var modules = core.config('modules');
	for(var index in modules){
		var m = modules[index];
		var mCtrls = core.modules[m.name].controllers;
		autoRoute(mCtrls,m.urlPath)
	}
}

function autoRoute(ctrls,moduleUrl){
		console.log(moduleUrl);

		for(var ctrlName in ctrls){
			var ctrl = ctrls[ctrlName];
			for(var actionName in ctrl['get']){
				setRoute(ctrl,ctrlName,actionName,'get',moduleUrl)
			}
			for(var actionName in ctrl['post']){
				setRoute(ctrl,ctrlName,actionName,'post',moduleUrl)
			}
			for(var actionName in ctrl['put']){
				setRoute(ctrl,ctrlName,actionName,'put',moduleUrl)
			}
			for(var actionName in ctrl['del']){
				setRoute(ctrl,ctrlName,actionName,'delete',moduleUrl)
			}
		}
	}

	function setRoute(ctrl,ctrlName,actionName,method,moduleUrl){
		var action = ctrl[method][actionName];
		if (actionName == 'index') {
			var urlPath = path.join('/',moduleUrl,ctrlName);
			core.route(method,urlPath,action)
			console.log(method.toString().red + ': ' + urlPath.toString()+ ' ===> ' + ctrlName.toString() + '.'+actionName.toString());
		}
		else{
			var urlPath = path.join('/',moduleUrl,ctrlName,actionName);
			core.route(method,urlPath,action)
			console.log(method.toString().green + ': ' + urlPath.toString()+ ' ===> ' + ctrlName.toString() + '.'+actionName.toString());
		}
		
	}


