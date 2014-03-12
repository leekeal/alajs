var Definer = require('./definer')
module.exports = Appication;




function Appication(){
	this.modules = {};
	this.name = {};
	this.server = {};
	this.define = new Definer(this);

}

Appication.prototype.optionsHandler = function(options){
	this.name = options.name;
}


