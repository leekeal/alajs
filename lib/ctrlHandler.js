var fs = require("fs");
var path = require("path");
var util = require('util');
var BaseController = require('./baseClass/BaseController')


module.exports = function(core){

	loadCtrl();


	/*加载controller*/
	function loadCtrl(){
		// var baseController = new BaseController(core);

		var baseController = BaseController(core);

		try{
			var files = fs.readdirSync(core.get("controllerPath"));/*读取控制器目录*/
			files.forEach(function(file){
				var filePath = path.join(core.get("controllerPath"),file);
				var stat = fs.statSync(filePath);
				if (stat.isFile()) { /*是文件的直接加入控制器集合*/

					var controller = require(filePath);
					controller.prototype = baseController;
					controller.prototype.name = path.basename(file,'.js');
					controller = new controller(core);
					core.controllers[path.basename(file,'.js')] = controller;
				}
			});

			alajs.echoInfo('(2) load ctrollers success');
		}catch(err){
			alajs.echoError('(2)loadCtrl error');
			console.log(err)
		}
	}/**/

}





