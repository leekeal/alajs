var fs = require("fs");
var path = require("path");
var util = require('util');
var BaseController = require('./baseClass/baseController')


module.exports = function(core,bootNext){

	loadCtrl();

	alajs.echoInfo('控制器加载成功');
	bootNext();/*进入下一个启动环节*/


	/*加载controller  全部是同步执行*/
	function loadCtrl(){


		// try{
			var files = fs.readdirSync(core.config("controllerPath"));/*读取控制器目录*/
			files.forEach(function(file){
				var filePath = path.join(core.config("controllerPath"),file);
				var stat = fs.statSync(filePath);
				if (stat.isFile()) { /*是文件的直接加入控制器集合*/

					var controller = require(filePath);

					// controller = new controller(core);
					core.controllers[path.basename(file,'.js')] = controller;
				}
			});
		// }catch(err){
		// 	alajs.echoError('(2)loadCtrl error');
		// 	throw new Error();
		// }
	}/**/

}





