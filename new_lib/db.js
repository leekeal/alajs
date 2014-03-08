var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.autoIncrement = require('mongoose-auto-increment');
mongoose.validator = require('ala-mongoose-validator')


var fs = require('fs');
var path = require('path')

module.exports = function(app,bootNext){
	app.models = {}
	app.mongoose = mongoose
	connectDb()


	function connectDb(){
		mongoose.connect(app.get('database'));
		var db = mongoose.connection;
		mongoose.autoIncrement.initialize(db);
		/*添加自增字段插件*/
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function callback () {
			console.info('数据库连接成功')
			loadModels();
			console.info('模型加载成功')
			bootNext();
		});


	}



	function loadModels(){
		try{
			var files = fs.readdirSync(app.get('models'));
			files.forEach(function(file){
				var filePath = path.join(app.get('models'),file);
				var stat = fs.statSync(filePath);
				if(stat.isFile()){
					console.log('model-->'+file)
					var model = require(filePath);
					var fileName = path.basename(file,'.js');
					app.models[fileName] = model(app,mongoose);

				}
			});
		}catch(err){
			console.info(err);
			throw err
		}
	}
}