var hbs = require('express-hbs');

module.exports = function(core,bootNext){
	core.express.engine('hbs', hbs.express3({
		partialsDir: core.config('views')
	}));
	alajs.echoInfo('视图模板加载成功');
	bootNext();
}