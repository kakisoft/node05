var http = require('http');
var fs = require('fs');
var url = require('url');
var ejs = require('ejs');
var cookie = require('cookie');

var index = fs.readFileSync('./index.ejs','utf8');
var style = fs.readFileSync('./style.css','utf8');

var datas = [
    {'name':'Taro','mail':'taro@yamada','tel':'090-9999-9999'},
    {'name':'hanako','mail':'hanako@flower','tel':'090-8888-8888'},
    {'name':'ichiro','mail':'ichiro@baseball','tel':'090-7777-7777'}
];

var server = http.createServer();
server.on('request',doRequest);
server.listen(1337);

function doRequest(req, res){
    var path = url.parse(req.url);

    switch(path.pathname){
        case '/':
            var msg = 'there is no cookie.';
            if(req.headers.cookie != null){
                var ck = cookie.parse(req.headers.cookie);
                msg = "cookie:" + ck.lasturl + "," + ck.lasttime;
            }
            var tmp = ejs.render(index,{
                title:"Index Page",
                msg:"Cookie:" + msg,
                datas:datas
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
        
        case '/favicon.ico':
            break;

        case '/time':
            var d = new Date().toDateString();
            var ck1 = cookie.serialize('lasttime', d,{
                maxAge:100
            });
            res.setHeader('Set-Cookie',ck1);
            res.setHeader('Content-Type','text/plain');
            res.write('COOKIE SETTED:lasttime');
            //res.write('ERROR!');
            res.end();
            break;
        
        default:
            var ckl = cookie.serialize('lasturl',path.pathname,{
                maxage:100
            });
            res.setHeader('Set-Cookie',ckl);
            res.setHeader('Content-Type','text/plain');
            res.write('SET URL COOKIE!');
            res.end();
            break;

        /*
            res.setHeader('Content-Type','text/plain');
            res.setHeader('Set-Cookie',['lasturl=' + path.pathname]);
            res.write('COOKIE SETTED:' + 'lasturl=' + path.pathname );
            //res.write('ERROR!');
            res.end();
            break;
        */
    }
}
console.log('Server running at http://1337')