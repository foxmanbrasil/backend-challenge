var jwt = require('jsonwebtoken');
var config = require('./config.js');


var checkToken = function(req, res, next) {
    var token = req.headers['x-access-token'] || req.headers.authorization;
    if (token) {
        if (token.slice(0, 7) === 'Bearer ') {
            token = token.slice(7, token.length); // if Easy Carros auth. Start with  'Bearer' i will  remove it; 
        }
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};
module.exports = {
    checkToken: checkToken
};