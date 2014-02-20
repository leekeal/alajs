var path = require('path');
var express = require('express'); 

module.exports = function(core){
	
	core.use(express.favicon(path.join(core.get('publicFloder'),'favicon.ico')));
	core.use(express.logger(core.get('logger')));
	core.use(express.json());
	core.use(express.urlencoded());
	core.use(express.methodOverride());


	core.use(core.express.router);
	/*静态文件，文件夹管理器*/
	if (core.get('directory')) {
		core.use(express.directory(core.get('publicFloder')))
	}

	core.use(express.static(core.get('publicFloder')));
	/*404*/
	core.use(function(req, res, next){
		res.status(404);
		res.send('<h1>你所访问的页面不存在</h1>');
	});
	
}

