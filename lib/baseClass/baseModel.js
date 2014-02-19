module.exports = function(db){
	var db = core.db;


var BaseModel = function(){}

	BaseModel.prototype.define = db.define;

	BaseModel.prototype.test = function(){
		console.log(123123123);
	}



	return new BaseModel()
}