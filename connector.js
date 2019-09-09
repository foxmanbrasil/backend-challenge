const { ServiceBroker } = require("moleculer");
var Redis = require("ioredis");
var db = new Redis({
    port: 6379, // Redis port
    host: '54.232.209.246', // address of my redis 
    //host: '127.0.0.1', //se vc tem Redis on your server
    family: 4, // 4 (IPv4) or 6 (IPv6)
    password: "phantom",
    db: 1
});
var broker = new ServiceBroker({ nodeID: "server-1", namespace: "CAR", transporter: { type: "Redis", db }, logger: false });
module.exports = { 'db': db, 'broker': broker };