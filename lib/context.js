



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


	function ajaxHandler(status,error,data){
		var result = {};
		result.status = status;
		result.msgs = error;
		result.data = data;
		context.body = result;
	}


	/*ajax格式助手*/
	if(context.send)
		console.error('koa context中send方法已经存在，请注意');
	else
		context.send = sendHandler


	function sendHandler(data){
		context.body = data;
	}



}