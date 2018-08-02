const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const querystring = require('querystring')
const port = 3000;
const hostname = '127.0.0.1';
let app = http.createServer((req, res) => {

    let pathname = url.parse(req.url).pathname === '/' ? 'signin.html' : url.parse(req.url).pathname;
    let ext = path.extname(pathname) || '';
    let basePath = path.resolve(__dirname, './views');
    console.log(ext);
    if (!ext) {
        if (req.url == '/login' && req.method.toLowerCase() == 'post') {
            var post = '';

            req.on('data', function (chunk) {
                post += chunk;
            });

            req.on('end', function () {
                post = querystring.parse(post);
                res.writeHead(200, {
                    'Content-type': 'text/plain;charset=utf8'
                });
                res.write(`用户名:${post.username}\n`);
                res.write(`密码:${post.password}`);
                res.end();
            });

            return;
        }
    }
    switch (ext) {
        case '.js':
        case '.css':
            fs.readFile(basePath + '/' + pathname, (err, data) => {
                if (err) throw err;
                res.writeHead(200, {
                    'Content-type': {
                        '.css': 'text/css',
                        '.js': 'text/javascript'
                    }[ext]
                });
                res.write(data);
                res.end();
            })
            break;
        case '.html':
            fs.readFile(basePath + '/' + pathname, (err, data) => {
                if (err) throw err;
                res.writeHead(200, {
                    'Content-type': 'text/html'
                });
                res.write(data);
                res.end();
            })
            break;
        default:
            res.writeHead(404, {
                'Content-type': 'text/plain'
            });
            res.end();
            break;
    }


})

app.listen(port, hostname, () => {
    console.log(`app is running in ${hostname} : ${port}`);

})