
var enforce = require("enforce");
module.exports = function(){
	return validate
}


var validate = {}

validate.__proto__ = enforce

validate.notSpaceOnly = function(){
	return this.patterns.match(/\S/,'','Can`t only for space')
}
