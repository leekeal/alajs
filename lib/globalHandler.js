var colors = require('colors');


module.exports = function(){
	colors.setTheme({
		success:'green',
		silly: 'rainbow',
		input: 'grey',
		verbose: 'cyan',
		prompt: 'grey',
		info: 'cyan',
		data: 'grey',
		help: 'cyan',
		warn: 'yellow',
		debug: 'red',
		error: 'red'
	});
	alajs.echodebug = function(message){
		console.log("<-------------debug------------->\n".debug+message.toString().debug);
	}
	alajs.echoInfo = function(message){
		console.log('[INFO]==> '.info+message.toString());
	}
	alajs.echoSuccess= function(message){
		console.log('[SUCCESS]==> '.success+message.toString().success);
	}
	alajs.echoError= function(message){
		console.log('[ERROR]==> '.error+message.toString().error);
	}
	alajs.echoAutoRoute = function(method,message){
		console.log('['.info+method.toString().info+']-> '.info+message);
	}
}



