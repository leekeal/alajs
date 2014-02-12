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
			if (method == "GET") {  /*处理get*/
				getAutoHandler(req);
			}
			else{   /*处理 post put dele*/
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
	var method = method == "POST" ? 'post':method == "PUT" ? 'put':method=="DELETE"? "dele":null

	var expressMethodName = method == 'dele'? "delete":null  /*处理expree delete 方法名称问题*/

	var ctrl = req.params.ctrl;
	var sub = req.params.sub;
	var _Sub = req.params.sub ? firstToBig(req.params.sub) : 'Index';
	console.log(_Sub)

	var action = method + (req.params.action ? firstToBig(req.params.action) : 'Index');


	if (method) {
		/*ctrl存在   ctrl存在是对象   sub控制器存在是对象   sub的action是函数*/
		if (ctrl && typeof ala.controllers[ctrl] == 'object' && typeof ala.controllers[ctrl][sub||'index'] == 'object' && typeof ala.controllers[ctrl][sub||'index'][action] == 'function'){
			sub = sub||'index';
			app[expressMethodName](req.path,ala.controllers[ctrl][sub][action])
			ala.echoInfo(method+'->  '+req.path+" ===> "+ctrl+"."+sub+"."+action)

		}
		/*ctrl存在  ctrl控制器存在是对象 sub作为action存在是函数*/
		else if(ctrl && typeof ala.controllers[ctrl] == 'object' && typeof ala.controllers[ctrl][method+(_Sub)] == 'function'){
			action = method+_Sub;
			app[expressMethodName](req.path,ala.controllers[ctrl][action])
			ala.echoInfo('put->  '+req.path+" ===> "+ctrl+"."+action)
		}

	};
}

function firstToBig(string){
	return string.replace(/\b\w+\b/g, function(word){
		return word.substring(0,1).toUpperCase()+word.substring(1);}
		)
}


