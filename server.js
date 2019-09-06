var express = require('express');
var bodyParser = require('body-parser');
var middleware = require('./check_token');
var HandlerGenerator = require('./handler');
var cors = require('cors');




// Starting point of the server
function main() {
    app = express(); // Export app for other routes to use
    app.use(cors());
    app.options('*', cors());
    handlers = new HandlerGenerator();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    // Routes & Handlers
    app.post('/login', handlers.login);
    app.get('/find', middleware.checkToken, handlers.find);
    app.get('/', handlers.index);
    module.exports = app.listen(8080);
}

main();