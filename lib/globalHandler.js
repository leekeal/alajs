var alajs = require("alajs");
var colors = require('colors');


module.exports = function(ala){
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
	ala.echodebug = function(message){
		console.log("<-------------debug------------->\n".debug+message.toString().debug);
	}
	ala.echoInfo = function(message){
		console.log('[INFO]==> '.info+message.toString());
	}
	ala.echoSuccess= function(message){
		console.log('[SUCCESS]==> '.success+message.toString().success);
	}
	ala.echoError= function(message){
		console.log('[ERROR]==> '.error+message.toString().error);
	}
}



