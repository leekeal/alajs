alajs 使用文档
=============
##1.安装


1. 安装修改文件重新启动工具

		npm -g install node-dev	
			
2. 创建程序文件夹,例如demo

3. 进入demo文件夹，安装ajajs框架模块

		npm install alajs --save-dev
	

4. 创建server.js文件,加入以下内容。

		var alajs = require("alajs"); 
		/*加载alajs框架*/
		var app = alajs.bootstrap("app"); 
		/*启动alajs框架， 参数：程序文件夹名称*/
		
5. 启动程序

	1. 普通启动 	
		
			node-dev server.js
			
	2. debug模式启动
		
			node-dev --debug server.js //启动
				
	显示如下内容表示启动成功
		
		Debugger listening on port 5858
		[INFO]==> (1) configuration success
		[INFO]==> (2) load ctrollers success
		[INFO]==> (3) set route success
		[Server Start]listen on ---> http://127.0.0.1:8000
		
6. 访问 http://127.0.0.1:8000  显示如下内容
	
		欢迎使用ALA团队出品的alajs框架
		
7. 创建自己的第一个页面在根目录下创建public文件夹,然后创建 index.html,写入任意内容。
	
		重新访问 http://127.0.0.1:8000


##2 创建app目录
查看server.js

		var alajs = require("alajs"); 
		/*加载alajs框架*/
		var app = alajs.bootstrap("app"); 
		/*启动alajs框架， 参数：程序文件夹名称*/
		
在根目录下创建bootstrap方法的参数同名的文件夹。这里可以自由设置，
但是必须和文件夹名称想同。
创建后的目录结构
		
	demo
	    ---app
	          ----config			---配置文件目录
	          ----controllers    	---控制器目录
	          ----models			---模型目录	          
	          ----views				---视图目录
	    ---node_modules				---依赖模块
	    ---public					---静态资源
	    ---server.js				---启动文件
	    
##3 设置配置文件
在app/config目录下创建 app.conf.js文件加入一下内容
	
		var config = {
			/*通用配置配置*/
			general:{
				env:"development", 
				viewsPath:'views',
				viewEngine:'hbs',
				controllerPath:'controllers',
			},
			/*开发模式配置*/
			development:{
				port:8000,
				mongodb:"mongodb://localhost/test",
				publicFloder:"public",
				logger:"dev",
				directory:false
			},
			/*生产模式配置*/ 
			production:{
				port:80,
				mongodb:"",
			}
		}

		module.exports = config;		

general里的配置，在任何模式下都会有效。general 的env配置决定当前系统的环境。env的值，决定程序执行的时候读取的配置文件内容。比如现在env 是 development，那框架启动的访问端口是就8000.
	
	

###4 创建第一个控制器
 在app/controllers下的目录下创建posts.js文件比如要访问 http://127.0.0.1:8000/posts/all
 	我们加入一下代码: 
 	
 	module.exports = function(app){
		this.get("all",function(req,res){
			console.log("allHandler执行了");
			res.send('执行了post的all函数');
		});
	}

	
	
 访问http://127.0.0.1:8000/posts/all 将得到 “执行了post的all函数” 的页面。
 
###5 创建动态视图
 把allHandler函数改成以下代码
 	
 	module.exports = function(app){
		this.get('/all',function(req,res){

			var viewsData = {};

			viewsData['posts'] = [
			{
				"title": "leeke",
				"post": "22"
			},
			{
				"title": "accord",
				"post": "23"
			},
			{
				"title": "akira",
				"post": "23"
			}
			];

		

			res.render('all',viewsData);
		});
	}
 	

###6 创建第一张模板
 在app/views 目录下创建 all.hbs
 	
 	{{#each posts}}
		<h1>{{this.title}}</h1>
		<p>{{this.post}}</p>
	{{/each}}
 
 需要重新启动程序！！！
###7  添加header 和 footer
 在app/views 创建header.hbs 加入
 	
 	<div> 这里的header</div>
 	
 在app/views 创建footer.hbs 加入
 
 	<div> 这里是footerfooter</div>
 	
 修改all.hbs  内容如下
 
 	{{>header}}

	{{#each posts}}
		<h1>{{this.title}}</h1>
		<p>{{this.post}}</p>
	{{/each}}

	{{>footer}}	
  需要重新启动程序！！！
  
  
###8 获取get提交的数据

 在posts.js 添加一下代码
 	
 	map['createPost'] = "get /create";   

	exports.createPost = function(req,res,app){
		var viewsData = {};
		var post ={};
		post['title'] = req.query['title'];
		post['content'] = req.query['content'];
		res.send(post.title+'<br>'+post.content+"发表成功")
	}
  
访问 http://127.0.0.1:8000/posts/create?title= 我的文章&content= 我的文章内容
  
#####view     动态资源文件夹

主要放服务器端动态模版



控制器

 var map= {};
 exports.map = map;


map['index'] = "get /all";

<!--map 是进行ura路径设置，index指代下面的函数名称，get指的
是表单的提交方式，控制器文件名称＋空格后面的路径＝访问路径
http://127.0.0.1:8000/post／all
-->
exports.index = function(req,res,app){
   res.render('index',{title:'alablog'});

}

res.send('test - one ');
<!--res.send是向浏览器端发送文本数据-->
 res.render('index',{title:'alablog'});
 <!--res.render函数是调用模版显示他的参数第一个为模版名称，第二个参数是向模版传递变量-->
 
 
 {{> header}}
 
 {{> footer}}
 <!--要插哪里就写在哪里-->

res.render('index',{data:posts});
<!--data 视图模板文件里的变量，posts是给当前控制器的数据变量-->
###数据类型
####变量

####数组

#####对象

#####对象数组

模拟数据：
	var posts = [
	{
		"title": "leeke",
		"post": "22"
	},
	{
		"title": "accord",
		"post": "23"
	},
	{
		"title": "akira",
		"post": "23"
	}
	];


}<!--这就是一个3次循环-->

{{#each data}}
		<div class="post">
			<h3>{{this.title}}</h3>
{{/each}}
<!--这就是一个提取内容的例子-->

