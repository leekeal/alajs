var Application = require('./application');

exports = module.exports = alajs



function alajs(options){
	var application = new Application();
	application.optionsHandler(options);
	return application;
} 




exports.version = 0.1
/*

alajs.prototype.__proto__.__proto__.__proto__    
                  koa        koa.prototype          Emitter.prototype
app.__proto__.__proto__.__proto__.__proto__             
			    koa       koa.prototype     Emitter.prototype
			    */




