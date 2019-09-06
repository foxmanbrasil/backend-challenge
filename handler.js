var jwt = require('jsonwebtoken');
var config = require('./config');
var r = require('./database');
var NodeGeocoder = require('node-geocoder');
var geocoder = NodeGeocoder(config.Google);




class Handler {
    login(req, res) {
        var email = req.body.email;
        var password = req.body.password;
        if (email && password) {
            r.rawCall(['get', 'pass:' + email], function(err, resp) {
                if (err) { resp.send("Problema com banco de dados"); return; }
                if (resp === 'null') { res.json({ success: false, message: 'user does not exist' }); return; }
                if (resp !== password) { res.json({ success: false, message: 'Incorrect username or password' }); return; }
                if (resp === password) {
                    r.rawCall(['get', 'user:' + email], function(err, data) {
                        var Data = JSON.parse(data);
                        var token = jwt.sign({ id: Data.id, email: email }, config.secret, { expiresIn: config.expiresIn });
                        r.rawCall(['getset', 'lastlogin:' + Data.id, Date.now()], function(err, lastlogin) {
                            res.json({ success: true, message: 'Authentication successful!', 'token': token, 'you': Data, 'lastlogin': lastlogin });
                        });
                    });
                }
            });
        } else {
            res.json({
                success: false,
                message: 'Authentication failed! missing email or password'
            });
        }
    }

    find(req, res) {
        var Q = req.query;
        if (Q.lat && Q.long && Q.service) {
            r.rawCall(['georadius', "serv:" + Q.service, Number(Q.long), Number(Q.lat), Q.range || 10, "km", "ASC"], function(err, resp) {
                if (err) { resp.send("Problema com banco de dados"); return; }
                if (resp.length > 0) {
                    r.rawCall(['get', 'part:' + resp[0]], function(err, part) {
                        if (err) { resp.send("Problema com banco de dados"); return; }
                        var Part = JSON.parse(part);
                        res.json({ message: Part || [] });
                    });
                } else { res.json({ message: "não há um profissional disponível." }); }
            });
            return;
        }
        if (Q.address && Q.service) {
            geocoder.geocode(Q.address, function(err, res) {
                console.log(res, err); // i dont have Google working key server anymore.
            }).catch(function(err) {
                res.json({ success: true, message: err });
                return;
            });
        }
        if (!Q.service) {
            res.json({
                message: ' missing location or address  , service type'
            });
        }
    }
    index(req, res) {
        res.json({
            success: true,
            message: 'welcome to Easy Carros'
        });
    }
}



module.exports = Handler;