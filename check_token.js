var jwt = require('jsonwebtoken');
var config = require('./config.js');
const broker = require('./connector').broker;
broker.createService({
    name: "chekToken",

    actions: {
        async Token(ctx) {
            var token = ctx.params.token;
            if (token) {
                if (token.slice(0, 7) === 'Bearer ') {
                    token = token.slice(7, token.length); // if Easy Carros auth. Start with  'Bearer' i will  remove it;
                }
                try {
                    var decoded = await jwt.verify(token, config.secret)
                } catch (err) {
                    return { message: 'Token is not valid' };
                }
                return { id: decoded.id, message: 'welcome' };

            } else {
                return { message: 'Auth token is not supplied' };
            }
        }
    }

});