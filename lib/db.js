var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.autoIncrement = require('mongoose-auto-increment');
mongoose.validator = require('ala-mongoose-validator')


var fs = require('fs');
var path = require('path')

module.exports = function(core,bootNext){
	core.mongoose = mongoose
	connectDb()


	function connectDb(){
		mongoose.connect(core.config('database'));
		var db = mongoose.connection;
		mongoose.autoIncrement.initialize(db);
		/*添加自增字段插件*/
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function callback () {
			alajs.echoInfo('数据库连接成功')
			loadModels();
			alajs.echoInfo('模型加载成功')
			bootNext();
		});


	}



	function loadModels(){
		try{
			var files = fs.readdirSync(core.config('modelPath'));
			files.forEach(function(file){
				var filePath = path.join(core.config('modelPath'),file);
				var stat = fs.statSync(filePath);
				if(stat.isFile()){
					console.log('model-->'+file)
					var model = require(filePath);
					var fileName = path.basename(file,'.js');
					core.models[fileName] = model(core,mongoose);

				}
			});
		}catch(err){
			alajs.echoError(err);
			throw err
		}
	}
}