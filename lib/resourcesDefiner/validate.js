
var enforce = require("enforce");
module.exports = function(){
	return validate
}


var validate = {}

validate.__proto__ = enforce

validate.notSpaceOnly = function(){
	return this.patterns.match(/\S/,'','Can`t only for space')
}




validate.telephone= function () {
	var pattern, modifiers, msg
	 pattern = /^0?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/;
	 /*ember data 传上来的电话号码是number 无法字符串验证，所以转化一下*/
	if (typeof pattern == "string") {
		pattern = new RegExp(pattern, modifiers);
	}
	return function (v, next) {
		if(typeof v == 'number'){
			v = ""+v
		}
		if (typeof v == "string" && v.match(pattern)) return next();
		return next(msg || 'no-pattern-match');
	};
};


