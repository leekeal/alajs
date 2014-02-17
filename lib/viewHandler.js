hbs = require('hbs');
var ala;
var app;

module.exports = function(core){
	ala = core;
	app = ala.express;
	hbs.registerPartials(app.get('views'));
	
}