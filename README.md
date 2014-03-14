ALAJS Get Started
====================================
ALAJS is a simple mvc framework based on [koa](https://github.com/koajs/koa).Thank you very much, you are a great middle framework!

###1. Install 
	
	1. npm install alajs --save          
	2. npm -g install node-dev     
	

###2. Create app.js file and require alajs	

	var alajs = require('alajs');
	
###3. Define an App
	
	App = alajs({           /*please set the App to gobal*/
		name 		: 	'ALABLOG',
		databases	: 	{
			default:  'mysql:root@localhost/test',
			log 		: 'mongodb://localhost/test'
		},
		models 		: 	['/share/models']
	});
		
	
###4. Define a module

	App.define.module({
		name 			:   'root',
		url 			: 	'/',
		path 			: 	'/app',
		controllers		: 	['/controllers','/otherCtrls'],
		staticResources : 	'/static',
	})
	
###5. Set default module

	App.define.defaultModule('root');
	
###6. Define a server

	var server = App.define.server({port:3000});
	
###7.  Loader App to server

	server.loader(App);
	
###8. Startup server

	server.bootstrap();

###9. Create a welcome.js file in controllers folder and define a controller
	
	var welcome = App.define.controller({name:'welcome',url:'/welcome'})

###10. Define an action function for response

	
	welcome('you',function *(next){

		this.body = 'You are welcome!'

	})
		
###11. Start this app

	
	node-dev --debug --harmony app.js
	
###12. Visit [http://localhost:3000/welcome/you](http://localhost:3000/welcome/you)
