var hbs = require('express-hbs');

module.exports = function(app,bootNext){


	app.engine('.hbs', hbs.express3({
		partialsDir: [app.get('views')],
	}));


	// app.enable('view cache');

	
	console.info('视图模板加载成功');
	bootNext();
}