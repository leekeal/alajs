
module.exports = new ModelDefiner


function ModelDefiner(){}


ModelDefiner.prototype.co_find =	function (info){
	var self = this;
	return function(cb){
		self.find(info,cb);
	}
}



ModelDefiner.prototype.co_get = function (id){
	var self = this;
	return function(cb){
		self.get(id,cb);
	}
}

ModelDefiner.prototype.co_create = function (info){
	var self = this;
	return function(cb){
		self.create(info,cb);
	}
}

ModelDefiner.prototype.co_delete = function (id){
	var self = this;
	return function(cb){
		self.get(id,function(err,data){
			if (err) return cb(err)
				data.remove(cb)
		})
	}
}

ModelDefiner.prototype.co_update = function(id,info){
	var self = this;
	return function(cb){
		self.get(id,function(err,obj){
			obj.save(info,cb)
		})
	}
}


ModelDefiner.prototype.co_exists= function(info){
	var self = this;
	return function(cb){
		self.exists(info,cb)
	}
}

// function mergeObject(origin,target){
// 	for(i in origin){
// 		target[i] = origin[i]
// 	}
// }


