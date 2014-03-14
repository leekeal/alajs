
module.exports = ModelDefiner


function ModelDefiner(){
	var self = this;
	this.name = ''
	this.db = ''
	this.module = ''
	this.dbs = {}
	this.model = {}
}

ModelDefiner.prototype.optionHandler = function(options){
	this.options = options;
	this.name = options.name
	this.module = options.module;
	
	if(!options.db)
		this.db = this.dbs['default']
	else
		this.db = this.dbs[options.db]
}

ModelDefiner.prototype.define = function(options){
	var self = this;
	var model = this.db.define(self.name,options)


	// 才用上面的继承很多hasone 不能正使用
	this.model = model

	this.addTo();

	this.model.sync(function (err) {
		if(err){
			console.error(self.name + '模型表同步错误');
			throw err
		}
	});
}

/*为模型添加函数*/
ModelDefiner.prototype.f = function(name,callback){
	this.model[name] = callback
}


ModelDefiner.prototype.addTo = function(){
	if(!this.module) /*如果没有指定模块，就把模型加入 app*/
		this.app.models[this.name] = this.model

}

