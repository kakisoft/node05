var http = require('http');
var fs = require('fs');
var url = require('url');
var ejs = require('ejs');

var index = fs.readFileSync('./index.ejs','utf8');
var style = fs.readFileSync('./style.css','utf8');

var server = http.createServer();
server.on('request',doRequest);
server.listen(1337);

function doRequest(req, res){
    var path = url.parse(req.url);

    switch(path.pathname){
        case '/':
            var tmp = ejs.render(index,{
                title:"Index Page",
                msg:"This is Sample Page"
            });
            res.setHeader('Content-Type','text/html');
            res.write(tmp);
            res.end();
            break;
        
        case '/style.css': //For Style Sheet
            res.setHeader('Content-Type','text/css');
            res.write(style);
            res.end();
            break;
        
        default:
            res.setHeader('Content-Type','text/plain');
            res.write('ERROR!');
            res.end();
            break;
    }
}
console.log('Server running at http://1337')