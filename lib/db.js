var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

module.exports = function(){
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
		console.log('open db ok')
	});

	var UserSchema = mongoose.Schema({
		name: String,
		age:Number
	})
	/*建表，定义结构*/

	UserSchema.methods.getAll = function(){
		console.log('this user')
	};
	/*给模型添加方法*/


	var User = mongoose.model('User', UserSchema)

	/*把结构转化为模型*/
/*
	var user = new User({ name: 'leeke',age:'22' })
	// console.log(user.name);



	user.save(function (err, fluffy) {
  	if (err) // TODO handle the error
  		console.log('error')
	});
*/

// User.update({name:'leeke'},{age:22},{email:'leeke@ala-team.com'},function (err, numberAffected, raw) {
// });
	
	// user = User.find({},function(err,docs){
	// 	console.log(docs)
	// })

	var testUser = function(){
		this.name= 'accord';
		this.age= 12;

		this.test = function(){

		}

	}
	accord = new testUser()
	var user = new User(accord)

	user.save(function (err, fluffy) {
  	if (err) // TODO handle the error
  		console.log('error')
	});

	

}