var hbs = require('express-hbs');

module.exports = function(core,bootNext){
	core.engine = function(){
		core.express.engine.apply(core.express,arguments);
	}

	core.engine('.hbs', hbs.express3({
		partialsDir: [core.config('views')],
		viewsDir:core.config('views')
	}));
	app.config('view engine', 'hbs');

	// core.express.enable('view cache');

	
	alajs.echoInfo('视图模板加载成功');
	bootNext();
}