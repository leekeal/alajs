var path = require("path");
/*BaseController*/

module.exports = function(core){

	function BaseController(){}
	BaseController.prototype.get = function(urlPath,callback){
		setControllerRoute('get',this.name,urlPath,callback);
	}
	BaseController.prototype.post = function(urlPath,callback){
		setControllerRoute('post',this.name,urlPath,callback);
	}
	BaseController.prototype.put = function(urlPath,callback){
		setControllerRoute('put',this.name,urlPath,callback);
	}
	BaseController.prototype.delete = function(urlPath,callback){
		setControllerRoute('delete',this.name,urlPath,callback);
	}/**/


	function setControllerRoute(method,controllerName,urlPath,callback){
		var urlPath = path.join('/',controllerName,urlPath);
		core.route('get',urlPath,callback);
		console.log(urlPath);
	}

	return  new BaseController()

};


