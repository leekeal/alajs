var path = require('path');
var ala;
var app;
module.exports = function(core){
	ala = core;
	app = ala.express;
	router = new Router(); /*实例化router*/
	ala.router = router;
	/*ala.function.route*/
	ala.route = router.route;  /*把路由函数赋值给ala*/

	// ala.listentEvent('loadedControllers',router.autoRouter)  /*监听控制器加载事件,开始自动路由设置*/




}

Router = function(){

	
	this.route = function(method,path,callbacks){
		if(method == 'get'){
			app.get(path,callbacks);
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


	this.autoRouter = function(){
		alajs.echoInfo('(3) set autoRouter success');
		var controllers = ala.controllers;
		for(var mainName in controllers){
			var controller = controllers[mainName];
			for (var subName in controller){
				var sub = controller[subName];
				if(typeof sub == 'function' ){ /*如果sub已经是函数,执行路由设置*/
					var subNameArray = subName.split(/_/)
					var methodName = subNameArray[0];
					var actionName = subNameArray[1];
					if(methodName == 'post'||methodName == 'put'||methodName == 'dele'){
						methodName = methodName == 'dele'?'delete':methodName;
						var urlPath = path.join('/',mainName,actionName);
						this.route(methodName,urlPath,sub);
						if(actionName == 'index'){
							var urlPath = path.join('/',mainName);
							this.route(methodName,urlPath,sub);
						}
					}
					else{
						var actionName = subNameArray[0];
						var urlPath = path.join('/',mainName,actionName);
						this.route('get',urlPath,sub);
						if(actionName == 'index'){
							var urlPath = path.join('/',mainName);
							this.route('get',urlPath,sub);
						}
					}
					if(app.get('env') == 'development'){
						console.log((urlPath).green+" ---> "+(mainName+'.'+subName).blue);
					}
					
				}
				else if(typeof sub == 'object'){ /*如果sub还是对象的话,就继续循环下面的控制器*/
					for(var actionName in sub){ /*循环控制器的方法*/
						var action = sub[actionName];
						if(typeof action == 'function'){
							var actionNameArray = actionName.split(/_/)
							var methodName = actionNameArray[0];
							var actionName = actionNameArray[1];
							if(methodName == 'post'||methodName == 'put'||methodName == 'dele'){/*post put dele 处理*/
								methodName = methodName == 'dele'?'delete':methodName;
								var urlPath = path.join('/',mainName,subName,actionName);
								this.route(methodName,urlPath,action);

								if(actionName == 'index'){   /* 如果actionName是index  xxx/xxx => xxx/xxx/index  */
									var urlPath = path.join('/',mainName,subName);
									this.route(methodName,urlPath,action);
								}
								if(actionName == 'index'){  /* 如果subName是index  xxx/xxx =  xxx/xxx/index  */
									var urlPath = path.join('/',mainName);
									this.route(methodName,urlPath,action);
								}
								
							}
							else{
								var actionName = actionNameArray[0];
								var urlPath = path.join('/',mainName,subName,actionName);
								this.route('get',urlPath,action);
								if(actionName == 'index'){
									var urlPath = path.join('/',mainName,subName);
									this.route('get',urlPath,action);
								}
								if(actionName == 'index'){
									var urlPath = path.join('/',mainName);
									this.route('get',urlPath,action);
								}
							}
						}

						console.log((urlPath).green+" ---> "+(mainName+'.'+subName+'.'+actionName).blue);

					}
				}
			}
		}
	}

}
