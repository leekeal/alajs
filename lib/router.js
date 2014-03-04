var path = require('path');
var ala;
var app;
module.exports = function(core,bootNext){
	alajs.echoInfo('路由设置成功');
	var route = require(core.get('routerFile'))
	route(core,core.controllers)
	autoRoute();
	bootNext()

	function autoRoute(){
		var ctrls = core.controllers;
		
		for(var ctrlName in ctrls){
			var ctrl = ctrls[ctrlName];
			for(var actionName in ctrl['post']){
				var action = ctrl['post'][actionName];
				core.route('post',path.join('/',ctrlName,actionName),action)
			}
			for(var actionName in ctrl['put']){
				var action = ctrl['put'][actionName];
				core.route('put',path.join('/',ctrlName,actionName),action)
			}
			for(var actionName in ctrl['del']){
				var action = ctrl['del'][actionName];
				core.route('delete',path.join('/',ctrlName,actionName),action)
			}
		}
	}


}


