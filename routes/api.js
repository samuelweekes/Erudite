const express = require('express');
const api  = express.Router();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const studyRoutes   = require('./study');
const accountRoutes = require('./account');
const sessionRoutes = require('./session');
// const statRoutes    = require('./stat');

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://flat-pond-4570.eu.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'Tv-Wi43nEnQdrrZ0oPy3UC7izDwpVY06',
  issuer: `https://flat-pond-4570.eu.auth0.com/`,
  algorithms: ['RS256']
});

api.use(checkJwt);
api.use('/study', studyRoutes);
api.use('/account', accountRoutes);
api.use('/session', sessionRoutes);
// api.use('/stat', statRoutes);

module.exports = api;

// const addUser = function(req, res, next){
//   Mongo.User.findOne({id : req.body.name}, (err, account) => {
//     if(!account){
//       const user = { 
//         id: req.body.name,
//         username: 'asd333',
//         password: 'asd123',
//         account: {
//           balance : 0,
//           maxBalance: 0,
//           reward: 0,
//           maxReward: 0
//         }
//       }
//       Mongo.User.create(user, (err, newUser) => {
//         if(newUser){
//           console.log('Made a new user');
//           console.log(newUser);
//         }
//         next();
//       });
//     } else {
//       next();
//     }
//   })
// }