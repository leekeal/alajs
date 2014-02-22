module.exports = function(core){


	var bootHandlers = new Array();

	this.use = function(callback){
		bootHandlers.push(callback);
	}


	function next(){

		var bootHandler = bootHandlers.shift()
		if (bootHandler)
			bootHandler(core,next)
	}

	this.start = function(){
		next();
	}

}