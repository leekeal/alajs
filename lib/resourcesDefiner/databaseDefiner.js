module.exports = DatabaseDefiner
var orm = require("orm");

function DatabaseDefiner(option,callback){
	orm.connect(option.url,function(err,db){
		if (err) {
			console.error(" 数据库连接错误 " + option.url);
			// throw err;
			// console.dir(err);
			callback(new Error('database connet error'))
		}
		else{
			console.info('数据库连接成功 ' + option.url);
			callback(null,{name:option.name,connect:db})
		}

	})

	// db.on("connect", function (err) {
	// 	if (err) {
	// 		console.error(" 数据库连接错误 " + options);
	// 		throw err;
	// 	}
	// 	else{
	// 		console.info('数据库连接成功 ' + options);
	// 	}
	// });
	// return db;
}


