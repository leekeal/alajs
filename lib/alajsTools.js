var readline = require('readline');
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var ala;
var app;
module.exports = function(core){
	ala = core;
	app = ala.express;
	welcome();

}


function welcome(){
	console.log('\n')
	console.log('---欢迎使用alajs mvc框架---'.inverse);

	console.log('1. router 获取当前路由表');

	
	rl.write(': ');

	rl.on('line', function (cmd) {
		rl.write(null, {ctrl: true, name: 'u'});
		console.log('You just typed: '+cmd);
		rl.write(': ');
	});

}