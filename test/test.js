var app = require("../server");
var chai = require('../node_modules/chai');
chai.use(require('../node_modules/chai-http'));
var expect = chai.expect;

chai.request(app).get('/').end(function(err, res) {
    console.log("the ROOT / has no Token, assim Um visitor pode registrar ", res.body.message);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success');
});

chai.request(app)
    .post('/login').type("json")
    .send({ "email": "Talita.Costa@yahoo.com", "password": "b6Yi7N0uVJBFFEz" })
    .end(function(err, res) {


        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        console.log(res.body.you.name, " Last Login: ", new Date(Number(res.body.lastlogin)).toLocaleDateString("pt-BR"), ":", new Date(Number(res.body.lastlogin)).toLocaleTimeString("pt-BR")); //
        var token = res.body.token;
        chai.request(app)
            .get('/find')
            .set('Authorization', "Bearer " + token)
            .query({ "lat": -25.444725, "long": -49.246821, service: 'DRY_WASHING', range: 10 })
            .end(function(err, res) {
                console.log(res.body);
            });


    });