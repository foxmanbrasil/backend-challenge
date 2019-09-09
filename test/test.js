const app = require("../server");
const chai = require('../node_modules/chai');
chai.use(require('../node_modules/chai-http'));
const expect = chai.expect;

setTimeout(function() {
    const address = "http://127.0.0.1:8080";
    console.log(" vamos fazer login ");
    chai.request(address)

    .post('/login').type("json")
        .send({ "email": "Talita.Costa@yahoo.com", "password": "b6Yi7N0uVJBFFEz" })
        .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('token');
            var D = new Date(Number(res.body.lastlogin));
            console.log(res.body.userData.name, " Last Login: ", D.getDate() + "/", D.getMonth() + 1, "-", D.toLocaleTimeString("pt-BR")); //
            var token = res.body.token;
            console.log("get /find with lat,long, service")
            chai.request(address)
                .get('/find')
                .set('Authorization', "Bearer " + token)
                .query({ "lat": -25.444725, "long": -49.246821, service: 'DRY_WASHING', range: 10 })
                .end(function(err, res) {
                    console.log(res.body);
                });

        });
}, 1000);