var mongoose = require('mongoose');
// validate = require('mongoose-validator').validate;
var validator = require('ala-mongooseValidator')

var fs = require('fs');
var path = require('path')

module.exports = function(core,bootNext){
	connectDb()


	function connectDb(){
		mongoose.connect(core.get('database'));
		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function callback () {
			alajs.echoInfo('数据库连接成功')

			core.models = mongoose.models;
			loadModels();

			alajs.echoInfo('模型加载成功')
			bootNext();
		});


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
					model(core,mongoose,validator);

				}
			});
		}catch(err){
			alajs.echoError(err);
			throw err
		}
	}
}