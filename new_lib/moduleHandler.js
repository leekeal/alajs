
/*加载器*/
var loadCtrl = require('./controller');
module.exports = function(app,bootNext){
	app.contollres = loadCtrl(app)
	bootNext();
}







