const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {

    res.setHeader('Content-type', 'text/html');

    const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);
    let basePath = '';

    switch(req.url) {
        case '/':
            basePath = createPath('index');
            res.statusCode = 200;
            break;
        case '/clients': 
            basePath = createPath('users');
            res.statusCode = 301;
            res.setHeader('Location', '/users');
            res.end();
            break;
        case '/users':
            basePath = createPath('users');
            res.statusCode = 200;
            break;
        default:
            basePath = createPath('error');
            res.statusCode = 404;
            break;    
    }

    fs.readFile(basePath, (error, data) => {
        if(error) {
            console.log(error);
            res.statusCode = 500;
            res.end()
        } else {
            res.write(data)
            res.end()
        }
    })
})

server.listen(PORT, 'localhost', (err) => {
    err ? console.log(err) : console.log('listening port 3000')
})
