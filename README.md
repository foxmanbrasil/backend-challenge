# backend-challenge
backend-challenge test (ilhami)

* i am useing Redis as Database , destance calculator 
inside config.js you can change :
1- Token secret.
2- expiresIn.
3- Google ( server key ); // not working for me any more ,i am moved t Amazon
---------
inside database.js you can change REDIS (address,IP)  and Passwor,port ,dataBase Number.


Main file is server.js  there you have "var old = require('./oldDataImporter');" which will import your
users.json ,partners.json to Redis , my server allready has.

you need to run inside the project :
# npm install
# npm start

it will import data from ./oldData folder .
should in your case show :
#I got  users:60 ,partners :20


-------------------

# EndPoints:
/login => which is [POST] need  email,password   // the same as You use. 

/find =[GET] need  token,lat,long,service // return data of One Partner.

/findall =[GET] need  token,lat,long,service // return array of partners id.s.


-------
# TEST
# npm test 
---------------------
Bônus , /login return  token, last login(unix-time),user data ( in case of connecting from other device ,or pc)

# What is Moleculer?
Moleculer is a fast, modern and powerful microservices framework for Node.js. It helps you to build efficient, reliable & scalable services. Moleculer provides many features for building and managing your microservices.

# Features
Promise-based solution (async/await compatible)
request-reply concept
support streams
support event-driven architecture with balancing
built-in service registry & dynamic service discovery
load balanced requests & events (round-robin, random, cpu-usage, latency)
many fault tolerance features (Circuit Breaker, Bulkhead, Retry, Timeout, Fallback)
supports middlewares
supports versioned services
service mixins
built-in caching solution (memory, Redis)
pluggable transporters (TCP, NATS, MQTT, Redis, NATS Streaming, Kafka)
pluggable serializers (JSON, Avro, MsgPack, Protocol Buffers, Thrift)
pluggable validator
multiple services on a node/server
all nodes are equal, no master/leader node
parameter validation with fastest-validator
built-in health monitoring & metrics
official API gateway module and many other modules…


ilhami mounir aziz (curitiba)
obrigado

6/9/2019


