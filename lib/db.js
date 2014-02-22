var fs = require('fs');
var path = require('path')
var orm = require("orm");
module.exports = function(core,bootNext){
	var db;
	createDb()

	

	function createDb(){
		var dbUrl = core.get('database');
		if(dbUrl){
			db = orm.connect(dbUrl);
			core.db = db;
			core.models = db.models;

			db.on("connect", function (err) {
				if (err) {
					console.log("数据库连接出错", err);
					return;
				}
				else{
					alajs.echoInfo('数据库连接成功')

					loadModels();
					alajs.echoInfo('模型加载成功')
					bootNext();
				}
			});
		}
	}




	function loadModels(){
		try{
			var files = fs.readdirSync(core.get('modelPath'));
			files.forEach(function(file){
				var filePath = path.join(core.get('modelPath'),file);
				var stat = fs.statSync(filePath);
				if(stat.isFile()){
					console.log('model-->'+file)
					var model = require(filePath);
					model(core,db,orm);

				}
			});
		}catch(err){
			alajs.echoError(err);
			throw err
		}
	}

}