const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(`request for ${req.url} by method ${req.method}`);

    if (req.method == 'GET') {
        var fileUrl;
        if (req.url == '/')
            fileUrl = '/index.html';
        else
            fileUrl = req.url;

        var filePath = path.resolve('./public' + fileUrl);
        var error = path.resolve('./public/404.html');
        const fileExt = path.extname(filePath);
        if (fileExt == '.html') {
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    res.statusCode = 404;
                    res.setHeader('Content-type', 'text/html');
                    // res.end('ddd');
                    fs.createReadStream(error).pipe(res);
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-type', 'text/html');
                fs.createReadStream(filePath).pipe(res);
            });
        }
        else {
            res.statusCode = 404;
            res.setHeader('Content-type', 'text/html');
            res.end('<html><body><h1>type is not html</h1></body></html>');
            return;
        }
    } 
    else {
        res.statusCode = 404;
        res.setHeader('Content-type', 'text/html');
        res.end('<html><body><h1>this method is not supported!!!</h1></body></html>');
        return;
    }
});

server.listen(port, hostname, () => {
    console.log(`Server up and running at http://${hostname}:${port} `)
});