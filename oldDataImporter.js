const db = require('./connector').db; // db is redis now
const broker = require('./connector').broker; // db is redis now
broker.createService({
    name: "getOldData",
    actions: {
        all(ctx) {
            if (ctx.params.delete) {
                db.FLUSHDB;
                console.log(" i am clear all data in redis [1]")
            }; // AVISO AVISO AVISO isso vai deletar tudo de banco (1) pode desmarcar ,, 
            /* vamos importar de /oldData --> users.json ,partners.json */

            var obj = require('./oldData/users');
            Lusers = obj.length;
            obj.map(function(user) {
                db.set('pass:' + user.email, user.password);
                delete user.password;
                db.mset('user:' + user.email, JSON.stringify(user), 'user:' + user.id, JSON.stringify(user)); // i saved user 2 times, with email and id , so u can get it with both 
            });

            var obj2 = require('./oldData/partners');
            Lpartners = obj2.length;
            obj2.map(function(part) {
                db.set('part:' + part.id, JSON.stringify(part));
                part.availableServices.map(function(serv) {
                    db.geoadd('serv:' + serv, part.location.long, part.location.lat, part.id);
                });
            });



            return ("I got  users:" + Lusers + " ,partners :" + Lpartners);
        }
    },





});