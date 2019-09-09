const broker = require('./connector').broker;
const db = require('./connector').db;
const jwt = require('jsonwebtoken');
const config = require('./config');
broker.createService({
    name: "login",
    actions: {
        async user(ctx) {
            var email = ctx.params.email;
            var password = ctx.params.password;
            if (email && password) {
                var pass = await db.get('pass:' + email)
                if (!pass || pass === null) { return ({ success: false, message: 'user does not exist' }); }
                if (pass !== password) { return ({ success: false, message: 'Incorrect username or password' }); }
                if (pass === password) {
                    var data = await db.get('user:' + email)
                    var Data = JSON.parse(data);
                    var token = jwt.sign({ id: Data.id, email: email }, config.secret, { expiresIn: config.expiresIn });
                    var lastlogin = await db.getset('lastlogin:' + Data.id, Date.now())
                    return ({ 'token': token, 'userData': Data, 'lastlogin': lastlogin });
                }
            } else {
                return ({
                    success: false,
                    message: 'Authentication failed! missing email or password'
                });
            }
        }
    }
});