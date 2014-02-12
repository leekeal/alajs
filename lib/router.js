var path = require('path');
var ala;
var app;
module.exports = function(core){
	ala = core;
	app = ala.express;

	router = new Router();
	router.autoRoute()


	// app.get('/user/*',function(req,res){
	// 	res.send('some html');
	// })

	// 在这里让框架使用者设置框架;
	// 用路由里的next 来做一个函数

	return router;
}

Router = function(){
	this.autoRoute = function(){
		app.all('/:ctrl?/:sub?/:action?',function(req,res,next){
			var method = req.method;
			if (method == "GET") {
				getAutoHandler(req);
			}
			else{
				otherAutoHandler(req,method);
			}
			next();
		});

		
	}
}

function getAutoHandler(req){
	var ctrl = req.params.ctrl;
	var sub = req.params.sub;
	var action = req.params.action
	// debugger
	/*ctrl存在   ctrl存在是对象   sub控制器存在是对象   sub的action是函数*/
	if (ctrl && typeof ala.controllers[ctrl] == 'object' && typeof ala.controllers[ctrl][sub||'index'] == 'object' && typeof ala.controllers[ctrl][sub||'index'][action||'index'] == 'function'){
		app.get(req.path,ala.controllers[ctrl][sub||'index'][action||'index'])
		ala.echoInfo('get->  '+req.path+" ===> "+ctrl+"."+(sub||'index')+"."+(action||'index'))
	}
	/*ctrl存在  ctrl控制器存在是对象 sub作为action存在是函数*/
	else if(ctrl && typeof ala.controllers[ctrl]== 'object' && typeof ala.controllers[ctrl][sub||'index'] == 'function'){
		app.get(req.path,ala.controllers[ctrl][sub||'index'])
		ala.echoInfo('get->  '+req.path+" ===> "+ctrl+"."+(sub||'index'))
	}
}

function otherAutoHandler(req,method){
	var ctrl = req.params.ctrl;
	var sub = req.params.sub;
	var action = req.params.action
	console.log(method)
	method = method == "POST" ? 'post':method == "PUT" ? 'put':method=="DELETE"? "dele":null

	if (method) {
			var ctrl = req.params.ctrl;
			var sub = req.params.sub;
			var action = req.params.action
			/*ctrl存在   ctrl存在是对象   sub控制器存在是对象   sub的action是函数*/
			if (ctrl && typeof ala.controllers[ctrl] == 'object' && typeof ala.controllers[ctrl][sub||'index'] == 'object' && typeof ala.controllers[ctrl][sub||'index'][method+(action||'Index')] == 'function'){
				sub = sub||'index';
				action = method+(action||'Index');
				app[method](req.path,ala.controllers[ctrl][sub][action])
				ala.echoInfo('put->  '+req.path+" ===> "+ctrl+"."+(sub)+"."+action)
			}
			/*ctrl存在  ctrl控制器存在是对象 sub作为action存在是函数*/
			else if(ctrl && typeof ala.controllers[ctrl] == 'object' && typeof ala.controllers[ctrl][method+(sub||'Index')] == 'function'){
				action = method+(sub||'Index');
				app[method](req.path,ala.controllers[ctrl][action])
				ala.echoInfo('put->  '+req.path+" ===> "+ctrl+"."+action)
			}

	};
}


