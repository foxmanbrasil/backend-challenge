'use strict';
const HTTPServer = require("moleculer-web");
const broker = require('./connector').broker;
const chk = require('./check_token');
const login = require('./login');
const find = require('./find');
const old = require('./oldDataImporter');


// Create the "gateway" service
broker.createService({
    name: "gateway",
    mixins: [HTTPServer], // its e http server
    settings: {
        port: 8080,
        cors: {
            origin: "*",
            methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
            allowedHeaders: ['content-type', 'authorization', 'x-access-token'],
            exposedHeaders: [],
            credentials: true,
            maxAge: 3600
        },
        mappingPolicy: "restrict",
        bodyParsers: { json: true, urlencoded: { extended: true } },
        routes: [{
                path: "/",
                async onBeforeCall(ctx, route, req, res) {
                    await broker.call('chekToken.Token', { token: req.$params.token || req.headers.authorization || req.headers['x-access-token'] }).then((message) => {
                        ctx.meta = message
                    });
                },
                aliases: {
                    "POST /login": "login.user",
                    "GET /find": "find.one",
                    "GET /findall": "find.all",
                    "GET /": "login.user"
                }
            }


        ],

    }
});

Promise.all([broker.start()]).then(() => { broker.call("getOldData.all", { delete: false }).then(res => console.log(res)) });