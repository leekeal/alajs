
module.exports = new ModelDefiner


function ModelDefiner(){}

/*
*条件查找
*/
ModelDefiner.prototype.co_find =	function (info){
	var self = this;
	return function(cb){
		self.find(info,cb);
	}
}

/*
*条件查找返回一个
*/
ModelDefiner.prototype.co_findOne =	function (info){
	var self = this;
	return function(cb){
		self.find(info,function(err,data){
			if(err){
				cb(err)
			}
			else{
				cb(null,data[0])
			}
		});
	}
}


/*
*ID查找返回一个
*/
ModelDefiner.prototype.co_get = function (id){
	var self = this;
	return function(cb){
		self.get(id,function(err,result){
			if(err){
				err.msg = 'Not found'
				cb(err)
			}
			else{
				cb(null,result)
			}
		});
	}
}

/*
*创建
*/
ModelDefiner.prototype.co_create = function (info){
	var self = this;
	return function(cb){
		self.create(info,cb);
	}
}
/*
*ID删除
*想扩展为，参数是number的时候id查找，参数是object的时候条件查找
*/
ModelDefiner.prototype.co_delete = function (id){
	var self = this;
	return function(cb){
		self.get(id,function(err,data){
			if (err) return cb(err)
				data.remove(cb)
		})
	}
}

/*
*通过ID更新
*想扩展为，参数是number的时候id查找，参数是object的时候条件查找
*/
ModelDefiner.prototype.co_update = function(id,info){
	var self = this;
	return function(cb){
		self.get(id,function(err,obj){
			obj.save(info,cb)
		})
	}
}

/*
*判断是否存在
*/
ModelDefiner.prototype.co_exists= function(info){
	var self = this;
	return function(cb){
		self.exists(info,cb)
	}
}
/*
*链式风格查找执行
*/
ModelDefiner.prototype.co_run= function(){
	var self = this;
	return function(cb){
		self.run(cb)
	}
}




