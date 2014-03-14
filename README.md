ALAJS Get Started
====================================
###1. 安装 
	
	1. npm install alajs --save    /*框架文件*/      
	2. npm -g install node-dev     /*文件修改自动启动工具*/

###2. 创建app.js引入alajs	

	var alajs = require('alajs');
	
###3. 定义一个app
	
	App = alajs({           /*App请使用全局,不加var*/
		name 		: 	'ALABLOG',
		databases	: 	{
			default:  'mysql:root@localhost/test',
			log 		: 'mongodb://localhost/test'
		},
		models 		: 	['/share/models']
	});
		
	
###4. 定义一个模块

	App.define.module({
		name 			:   'root',
		url 			: 	'/',
		path 			: 	'/app',
		controllers		: 	['/controllers','/otherCtrls'],
		staticResources : 	'/static',
	})
	
###5. 设置默认模块

	App.define.defaultModule('root');
	
###6. 定义一个服务器

	var server = App.define.server({port:3000});
	
###7. 加载App

	server.loader(App);
	
###8. 启动服务器

	server.bootstrap();

###9. 在controllers目录下创建一个welcome.js控制器文件，定义一个控制器
	
	var welcome = App.define.controller({name:'welcome',url:'/welcome'})

###10. 创建一个响应动作action
	
	welcome('you',function *(next){

		this.body = 'You are welcome!'

	})
	
###11 启动服务器
	
	node-dev --debug --harmony app.js
	
###访问 http://localhost:3000/welcome/you
