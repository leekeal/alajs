var path = require('path');
var rootPath = path.dirname(require.main.filename);


/*	

port:  服务器端口
publicFloder:   静态文件夹目录
views:   动态模板文件路径
view engine： 动态模板引擎 默认hbs
directroy:  
			参数	
			true  						开启静态文件夹管理器
			false						关闭静态文件夹管理器
logger:
			参数
			:method :url - :referrer	---> GET /index.html - http://localhost:8000/
			short						---> 127.0.0.1 - GET /index.html HTTP/1.1 304 - - 3 ms
			tiny						---> GET /index.html 304 - - 6 ms                      
			dev 						---> GET /index.html 304 9ms   有颜色，便于观看
			default						---> 127.0.0.1 - - [Mon, 10 Feb 2014 17:56:59 GMT] 
											"GET /index.html HTTP/1.1" 304 - "-" "Mozilla/5.0 
											(iPhone; U; CPU iPhone OS 4_3_2 like Mac OS X; en-us) 
											AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 
											Mobile/8H7 Safari/6533.18.5"
*/

var config = {
	general:{
		env:"default", 
		/* 开发模式 development ,生产模式 production*/
		"viewsPath":'views',    /*模板文件路径*/
		"view engine":'hbs',
		controllerPath:'controllers',
		publicFloder:"public",
	},

	/*开发模式配置*/
	default:{
		'port':8000,
		/*在启动的时候也可以用 PORT=9000 node service.js */
		mongodb:"mongodb://localhost/test",
		logger:"dev",
		directory:false,  /*静态文件管理器功能 参数 true , false*/
	},


	/*开发模式配置*/
	development:{
		'port':8000,
		/*在启动的时候也可以用 PORT=9000 node service.js */
		mongodb:"mongodb://localhost/test",
		logger:"dev",
		directory:false,  /*静态文件管理器功能 参数 true , false*/
	},



	/*生产模式配置*/ 
	production:{
		port:8000,
		/*在启动的时候也可以用 PORT=9000 node service.js */
		mongodb:"",
		directory:true
	}
}

module.exports = config;