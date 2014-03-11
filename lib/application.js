var Definer = require('./definer')
module.exports = App;




function App(){
	this.modules = {};
	this.name = {};
	this.server = {};
	this.define = new Definer();
	this.define.modules = this.modules;
}

App.prototype.optionsHandler = function(options){
	this.name = options.name;
}


