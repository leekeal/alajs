alajs 使用文档
=============
##1.安装


1. 安装修改文件重新启动工具

		npm -g install node-dev
2. 创建程序,例如demo

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

