var Core =  require("./lib/alajs.core");
var handlers = require("./lib/globalHandler"); /*开启全局工具*/


/*------------------- 占用全局alajs命名  -----------------*/
GLOBAL.alajs = {
	bootstrap:function(appName){
		handlers();/*加载handlers*/
		var core = new Core(appName);
		core.bootstrap();
		return core;

	},


	validator : require('validator'),
	md5:require('MD5')
}

module.exports = global.alajs;


