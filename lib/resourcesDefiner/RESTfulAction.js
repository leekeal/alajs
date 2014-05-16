module.exports = function(currentController){
	var ctrl = currentController;
	var modelName = ctrl.options.model
	var map = ctrl.options.model 

	ctrl.actionDefiner('all',{},function *(){
		console.log(modelName);
		var Allmap = map + 's'
		var $model = this.m(modelName);
		var result
		try{
			result = yield $model.co_find(this.query);
		}catch(err){
			return this.errors(err)
		}

		var mapping ={}
		mapping[Allmap] = result

		this.send(mapping)

	})



	ctrl.actionDefiner('one',{},function *(){
		var $model = this.m(modelName);
		var id = this.params.id;
		var result;
		try{
			result = yield $model .co_get(id);
		}catch(err){
			return this.errors(err)
		}

		var mapping ={}
		mapping[map] = result

		this.send(mapping)
	})

	ctrl.actionDefiner('update',{},function *(){
		var $model = this.m(modelName);
		var id = this.params.id;
		var result;

		try{
			result = this.post[map]
			result = yield $model.co_update(id,result);
		}catch(err){
			return this.errors(err)
		}

		var mapping ={}
		mapping[map] = result

		this.send(mapping)

	})

	ctrl.actionDefiner('create',{},function *(){
		var $model = this.m(modelName);
		var result
		try{
			result = this.post[map]
			result= yield $model.co_create(result);
		}catch(err){
			return this.errors(err)
		}

		var mapping ={}
		mapping[map] = result

		this.send(mapping)

	})


	ctrl.actionDefiner('delete',{},function *(){


		var id = this.params.id;
		var $model = this.m(modelName);
		
		try{
			var result = yield $model.co_delete(id);
		}
		catch(err){
			err.msg = 'Delete failed'
			return this.errors(err);
		}
		this.send({})
		
	})

	ctrl.actionDefiner('paging',{},function *(){
		var $model = this.m(modelName);

		try{
			var rules  = this.post['rules'];
			var query = this.post['query'];
			var offset = (rules.current - 1) * rules.size;
			result = yield $model.find({},rules.sort).limit(Number(rules.size)).offset(offset).co_run();
			var total = yield $model.co_count({});

		}catch(err){
			return this.errors(err)
		}
		this.send({
			total:total,
			data:result
		});
		
	})


}