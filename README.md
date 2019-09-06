# backend-challenge
backend-challenge test (ilhami)

* i am useing Redis as Database , destance calculator 
inside config.js you can change :
1- Token secret.
2- expiresIn.
3- Google ( server key ); // not working for me any more ,i am moved t Amazon
---------
inside database.js you can change REDIS (address,IP)  and Password 
i am working with redis database number [1] i have other things in database [0]

Main file is server.js  there you have "var old = require('./oldDataImporter');" which will import your
users.json ,partners.json to Redis , my server allready has.
you need to run inside the project :

# npm install
# npm start

-------------------

# EndPoints:
/ => just welcome . nothing more

/login => which is [POST] need  email,password   // the same as You use, 

/find =[GET] need  token,lat,long,service // 

thats all,
-------
# TEST
# npm test 
---------------------
Bônus , /login return  token, last login(unix-time),user data ( in case of connecting from other device ,or pc)

there is no PROTECTION, MICROSERVICE with pup/sub , nothing complecated ,, 
this what i could make in 2 days ,obrigado
ilhami mounir aziz (curitiba)
obrigado

6/9/2019


