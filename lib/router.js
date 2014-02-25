var path = require('path');
var ala;
var app;
module.exports = function(core,bootNext){
	alajs.echoInfo('路由设置成功');
	var route = require(core.get('routerFile'))
	route(core,core.controllers)
	bootNext()


}


