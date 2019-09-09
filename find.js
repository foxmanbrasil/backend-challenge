const broker = require('./connector').broker;
const db = require('./connector').db;
const jwt = require('jsonwebtoken');
const config = require('./config');
broker.createService({
    name: "find",

    actions: {
        async one(ctx) {
            if (!ctx.meta.id) { return ctx.meta; } else {
                var Qu = ctx.params;
                if (Qu.lat && Qu.long && Qu.service) {
                    var resp = await db.georadius("serv:" + Qu.service, Number(Qu.long), Number(Qu.lat), Qu.range || 10, "km", "ASC")
                    if (!resp) { return { message: "Problema com banco de dados" }; }
                    if (resp.length > 0) {
                        var part = await db.get('part:' + resp[0]);
                        if (!part) { return { message: "Problema com banco de dados" }; };
                        return JSON.parse(part);
                    } else { return ({ message: "não há um profissional disponível." }); }
                }

                if (Qu.address && Qu.service) {
                    /*
                         geocoder.geocode(Qu.address, function(err, res) {
                             console.log(res, err); // i dont have Google working key server anymore.
                         }).catch(function(err) {
                             res.json({ success: true, message: err });
                             return;
                         });
                         */
                }

                if (!Qu.service || (!Qu.address || (!Qu.lat && !Qu.long))) {
                    return ({ message: ' missing location or address  , service type' });
                }

            }
        },



        async all(ctx) {
            if (!ctx.meta.id) { return ctx.meta; } else {
                var Qu = ctx.params;
                if (Qu.lat && Qu.long && Qu.service) {
                    var resp = await db.georadius("serv:" + Qu.service, Number(Qu.long), Number(Qu.lat), Qu.range || 10, "km", "ASC")
                    if (!resp) { return { message: "Problema com banco de dados" }; }
                    if (resp.length > 0) {
                        return resp;
                    } else { return ({ message: "não há um profissional disponível." }); }
                } else {
                    return ({ message: ' missing location or service type' });
                }

            }
        }
    }
});