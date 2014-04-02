



module.exports = Context


function Context(context,app){
	var models = app.models;

	/*模块获取函数*/
	if(context.m)
		console.error('koa context中m方法已经存在，请注意');
	else
		context.m = getModel

	function getModel(name){
		if(!models[name]){
			console.error('你所调用的 模型不存在!');
			throw new Error();
		}
		else{
			return models[name]
		}
	}


	/*ajax格式助手*/
	if(context.ajax)
		console.error('koa context中ajax方法已经存在，请注意');
	else
		context.ajax = ajaxHandler


	function ajaxHandler(errorMsg,data){
		var result = {}
		if(arguments.length == 2){
			result.status = 'error'
			result.msg = errorMsg
			result.data = data;
		}
		else if(arguments.length == 1){
			result.status = 'success'
			result.data = errorMsg;
		}
		context.body = result;
	}


	/*ajax格式助手*/
	if(context.send)
		console.error('koa context中send方法已经存在，请注意');
	else
		context.send = sendHandler


	function sendHandler(status,data){
		if(arguments.length == 2){
			context.status = status; 
			context.body = data

		}
		else if(arguments.length == 1){
			context.body = status
		}
	}


	/*ajax格式助手*/
	if(context.errors)
		console.error('koa context中errors方法已经存在，请注意');
	else
		context.errors = errorsHandler


	function errorsHandler(error){
		context.status = 422;
		var errors = new Array();
		errors.push(error);
		
		context.body = {errors:errors};
	}



}