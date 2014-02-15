var path = require('path');
var ala;
var app;
module.exports = function(core){
	ala = core;
	app = ala.express;

	router = new Router();
	router.autoRoute();


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
			alajs.echoInfo('set auto route success');
			debugger;
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
	var sub = req.params.sub||'index';
	var action = req.params.action||'index'


	// debugger
	/*自动路由 get方法2级控制器目录下的控制器。 ctrl存在   ctrl存在是对象   sub控制器存在是对象   sub的action是函数*/
	if (ctrl && typeof ala.controllers[ctrl] == 'object' && typeof ala.controllers[ctrl][sub] == 'object' && typeof ala.controllers[ctrl][sub][action] == 'function'){
		app.get(req.path,ala.controllers[ctrl][sub][action])
		alajs.echoAutoRoute('get',req.path+" ===> "+ctrl+"."+(sub)+"."+(action))
	}
	/*自动路由get控制器根目录下的控制器。 ctrl存在  ctrl控制器存在是对象 sub作为action存在是函数*/
	else if(ctrl && typeof ala.controllers[ctrl]== 'object' && typeof ala.controllers[ctrl][sub] == 'function'){
		app.get(req.path,ala.controllers[ctrl][sub])
		alajs.echoAutoRoute('get',req.path+" ===> "+ctrl+"."+(sub))
	}
}

function otherAutoHandler(req,method){
	var method = method == "POST" ? 'post':method == "PUT" ? 'put':method=="DELETE"? "dele":null

	var expressMethodName = method == 'dele'? "delete":method  /*处理expree delete 方法名称问题*/

	var ctrl = req.params.ctrl;
	var sub = req.params.sub||'index';
	var _Sub = req.params.sub ? firstToBig(req.params.sub) : 'Index';
	/*在名为ctrl 的2级控制器目录不存在而根目录下名为ctrl的控制器存在时，把sub转化为根目录下的控制器的方法名称 postIndex  method加首字母大写*/

	var action = method + (req.params.action ? firstToBig(req.params.action) : 'Index');


	if (method) {
		/*自动路由 put post delete方法2级控制器目录下的控制器。  判断ctrl存在   ctrl存在是对象   sub控制器存在是对象   sub的action是函数*/
		if (ctrl && typeof ala.controllers[ctrl] == 'object' && typeof ala.controllers[ctrl][sub] == 'object' && typeof ala.controllers[ctrl][sub][action] == 'function'){
			app[expressMethodName](req.path,ala.controllers[ctrl][sub][action])
			alajs.echoAutoRoute(method,req.path+" ===> "+ctrl+"."+sub+"."+action)

		}
		/*自动路由put post delete 控制器根目录下的控制器。 ctrl存在  ctrl控制器存在是对象 sub作为action存在是函数*/
		else if(ctrl && typeof ala.controllers[ctrl] == 'object' && typeof ala.controllers[ctrl][method+(_Sub)] == 'function'){
			action = method+_Sub;
			app[expressMethodName](req.path,ala.controllers[ctrl][action])
			alajs.echoAutoRoute(method,req.path+" ===> "+ctrl+"."+action)
		}

	};
}

function firstToBig(string){
	return string.replace(/\b\w+\b/g, function(word){
		return word.substring(0,1).toUpperCase()+word.substring(1);}
		)
}


