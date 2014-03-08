var Core =  require("./lib/alajs.core");
var handlers = require("./lib/globalHandler"); /*开启全局工具*/


/*------------------- 占用全局alajs命名  -----------------*/
GLOBAL.alajs = {
	bootstrap:function(appName,numCPUs){
		handlers();/*加载handlers*/
		if(numCPUs == 1)
			onCreate(appName)
		else
			create(appName,numCPUs);
	},


	validator : require('validator'),
	md5:require('MD5'),
	inArray:function(val,array){
		for(index in array){
			if(val === array[index])
				return true;
		}
		return false;	
	}
}

module.exports = global.alajs;




/*启动多个进程*/
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
  
  /*启动独立进程*/
  function onCreate(appName){
  	var core = new Core(appName);
  	app = core.bootstrap();
  	GLOBAL.app =  core;
  }

