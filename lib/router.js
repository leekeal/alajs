var path = require('path');
var ala;
var app;
module.exports = function(core){
	ala = core;
	app = ala.express;
	var router = new Router(); /*实例化router*/
	/*ala.function.route*/
	ala.route = router.route;  /*把路由函数赋值给ala*/
	router.autoRoute();
	alajs.echoInfo('(3) set route success');

	if (app.get('env') == 'default') {
		app.get('/*',function(req,res,next){
			res.send('<h1>欢迎使用ALA团队出品的alajs框架</h1>');
			});
	};
}

var Router = function(){

	
	this.route = function(method,path,callbacks){
		if(method == 'get'){
			app.get(path,function(req,res,next){
				callbacks(req,res,ala)
			});
		}
		else if(method == 'post'){
			app.post(path,callbacks);
		}
		else if(method == 'put'){
			app.put(path,callbacks);
		}
		else if(method == 'delete'){
			app.delete(path,callbacks);
		}else{
			alajs.echoError(method +' method 不存在!!!')
		}
	}


	this.autoRoute = function(){
		var controllers = ala.getControllers();
		for (var controllerName in controllers){
			var actionMap = controllers[controllerName].map;
			for (var actionName in actionMap){
				var map = actionMap[actionName].split(" ");
				var method = map[0];
				var url = path.join('/',controllerName,map[1]);
				ala.route(method,url,controllers[controllerName][actionName])
				console.log((method).green+':  '+url+'-->  '+(controllerName+'.'+actionName).green)
			}
		}
	}
}
