var http = require("http");
var fs = require("fs");
var url = require("url");
var port = process.argv[2];

if (!port){
    console.log("请先指定端口");
    process.exit(1);
}

var server = http.createServer(function(request,response) {
    var parsedUrl = url.parse(request.url,true);
    var pathWithQuery = request.url;
    var queryString = "";
    if (pathWithQuery.indexOf("?") >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
    }
var path = parsedUrl.pathname;
var query = parsedUrl.query;
var method = request.method;

console.log("有请求发送过来：" + pathWithQuery);

if (path === "/"){
    response.statusCode = 200;
    response.setHeader("Content-Type","text/html;charset=utf-8");
    response.write(`
    <!DOCTYPE html>
    <link rel="stylesheet" href="/style.css">
    <h1>yes</h1>
    `);
response.end();
}else if (path === "/style.css"){
    response.statusCode = 200;
    response.setHeader("Content-Type","text/css;charset=utf-8");
    response.write(`h1{color:red;}`);
    response.end();
}else{
    response.statusCode = 404;
    response.setHeader("Content-Type","text/html;charset=utf-8");
    response.write(`你访问的页面不存在`);
    response.end();
}

});

server.listen(port);
console.log(
    "监听"+
    port +
    "端口成功/n请打开http://localhost:" +
    port
);
