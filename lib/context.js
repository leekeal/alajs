



module.exports = Context


function Context(context,app){
	var models = app.models;

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

}