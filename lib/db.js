var fs = require('fs');
var path = require('path')
var orm = require("orm");

var db = orm.connect("mysql://root:@localhost/test");
// var db = orm.connect("mongodb://blogadmin:ala20140123@fwind.me/alablog");
// var db = orm.connect("mongodb://localhost/test");
module.exports = function(core){
	core.db = db;

	db.on("connect", function (err) {
		if (err) {
			console.log("数据库连接出错", err);
			return;
		}
		else{
			alajs.echoSuccess('数据库连接成功')

			loadModels();
		}

	});




	function loadModels(){
		try{
			var files = fs.readdirSync(core.get('modelPath'));
			files.forEach(function(file){
				var filePath = path.join(core.get('modelPath'),file);
				var stat = fs.statSync(filePath);
				if(stat.isFile()){
					alajs.echoInfo('model-->'+file)
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