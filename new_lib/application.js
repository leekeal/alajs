var path = require('path');
var app = exports 
var Boot = require('./bootHandler');
var configuration = require('./configuration');
var controller = require('./controller')
var db = require('./db');
var view = require('./view');
var middleware = require('./middleware');
var moduleHandler = require('./moduleHandler')
var router = require('./router')

/*程序根目录*/


app.bootstrap = function(){
	console.info('bootstrap alajs mvc framework');
	boot = new Boot(this);
	boot.use(configuration)
	boot.use(db);

	boot.use(view)
	boot.use(middleware) 
	boot.use(moduleHandler)
	boot.use(router)
	boot.use(createServer)

	boot.start()

	/*加载配置文件*/
}


app.getModel =  function(modelName){
		if(typeof this.models[modelName] == 'function'){
			return this.models[modelName];
		}else{
			alajs.echoError(modelName + " 模型不存在");
			return false;
		}
	}




function createServer(app,bootNext){
	app.set('port',process.env.PORT || app.get('port'));
	app.listen(app.get('port'));
	console.log("[Server Start]listen on --->"+" http://127.0.0.1:"+app.get('port'));
	bootNext()
}