var r = require('./database'); //r para lembrar que to trabalhando com redis

//r.rawCall(["FLUSHDB"]); // AVISO AVISO AVISO isso vai deletar tudo de banco (1) pode desmarcar ,, 
/* vamos importar de /oldData --> users.json ,partners.json */
var obj = require('./oldData/users');
obj.map(function(user) {
    r.rawCall(['set', 'pass:' + user.email, user.password]);
    delete user.password;
    r.rawCall(['mset', 'user:' + user.email, JSON.stringify(user), 'user:' + user.id, JSON.stringify(user)]); // i saved user 2 times, with email and id , so u can get it with both 
});

var obj2 = require('./oldData/partners');
obj2.map(function(part) {
    r.rawCall(['set', 'part:' + part.id, JSON.stringify(part)]);
    part.availableServices.map(function(serv) {
        r.rawCall(['geoadd', 'serv:' + serv, part.location.long, part.location.lat, part.id]);
    });
});
console.log("I got all data i need");