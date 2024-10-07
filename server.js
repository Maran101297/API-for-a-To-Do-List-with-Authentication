//server.js
const http = require('http');
const app = require('./app')

const port = 7030;

const server = http.createServer(app);

server.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
});
