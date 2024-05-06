const http = require('http');
const port = 3000;
const fs = require('fs');

const server = http.createServer(function(req, res) {
    fs.readFile('src/index.html', function(error, data) {
        if (error) {
            res.writeHead(404);
            res.write('Error: File not found');
            res.end();
        } else {
            res.writeHead(200, {'Content-type':'text/html'}); 
            res.write(data);
            res.end();
        }
    });
});

server.listen(port, function(error) {
    if (error) {
        console.log('Error', error);
    } else {
        console.log('Server is listening on port' + port);
    }
});


