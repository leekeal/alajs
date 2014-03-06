var Core =  require("./lib/alajs.core");
var handlers = require("./lib/globalHandler"); /*开启全局工具*/


/*------------------- 占用全局alajs命名  -----------------*/
GLOBAL.alajs = {
	bootstrap:function(appName,numCPUs){
		handlers();/*加载handlers*/
		return create(appName,numCPUs);
	},


	validator : require('validator'),
	md5:require('MD5')
}

module.exports = global.alajs;





var cluster = require('cluster');
function create(appName,numCPUs){
	if (!numCPUs){
		var numCPUs = require('os').cpus().length;
	}

	if (cluster.isMaster) {
  		// Fork workers.
  		for (var i = 0; i < numCPUs; i++) {
  			cluster.fork();
  		}

  		cluster.on('exit', function(worker, code, signal) {
  			console.log('worker ' + worker.process.pid + ' died');
  		});
  	} 
  	else {
  		var core = new Core(appName);
		app = core.bootstrap();
		GLOBAL.app =  core;

  	}

  }

