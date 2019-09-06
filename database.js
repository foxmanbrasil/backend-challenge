var Redis = require('redis-fast-driver');
var db = new Redis({
    host: '54.232.209.246', // add of my redis 
    //host: '127.0.0.1', //se vc tem Redis on your server
    port: 6379,
    maxRetries: 10, //reconnect retries, default 10
    auth: 'phantom', //optional password, if needed
    db: 1, //optional db selection .... (0) i am using with other things
    autoConnect: true, //will connect after creation
    doNotSetClientName: false, //will set connection name (you can see connections by running CLIENT LIST on redis server)
    doNotRunQuitOnEnd: false, //when you call `end()`, driver tries to send `QUIT` command to redis before actual end
});
module.exports = db;