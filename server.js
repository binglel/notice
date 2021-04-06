var fs = require('fs');
var url = require('url');
var path = require('path');
var http = require('http');
var root = path.resolve(process.argv[2] || '.');	//服务器的server.js当前的目录
root=path.join(root,'.');	//访问页面的文件夹
console.log('Static root dir: ' + root);

//创建服务器
var server = http.createServer(function (request, response) {
	
    //http://127.0.0.1:8081/index.html获取请求的路径名即index.html
    var pathname = url.parse(request.url).pathname,
    
	//获取对应的本地文件的路径
        filepath = path.join(root, pathname);
    
	//获取文件状态
    fs.stat(filepath, function (err, stats) {
        if (!err && stats.isFile()) {
            console.log('200 ' + request.url);
			
            //发送响应
            response.writeHead(200);
			
            //将文件流导向response
            fs.createReadStream(filepath).pipe(response);
 
        } else {
            console.log('404 ' + request.url);
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

server.listen(8081);	//端口号
console.log('服务器开启成功');