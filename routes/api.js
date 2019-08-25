const express = require('express');
const api  = express.Router();
const Mongo = require('../models/index');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const studyRoutes   = require('./study');
const accountRoutes = require('./account');
const sessionRoutes = require('./session');

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://flat-pond-4570.eu.auth0.com/.well-known/jwks.json`
  }),

  audience: 'Tv-Wi43nEnQdrrZ0oPy3UC7izDwpVY06',
  issuer: `https://flat-pond-4570.eu.auth0.com/`,
  algorithms: ['RS256']
});

const getUser = function(req, res, next){
  Mongo.User.findOne({username : req.user.name}, (err, account) => {
    if(!account){
      const user = { 
        username: req.user.name,
        account: {
          balance : 0,
          maxBalance: 0,
          reward: 0,
          maxReward: 0
        }
      }
      Mongo.User.create(user, (err) => {
        if(err){console.log(err)};
        next();
      });
    } else {
      next();
    }
  })
}

api.use(checkJwt);
api.use(getUser);
api.use('/study', studyRoutes);
api.use('/account', accountRoutes);
api.use('/session', sessionRoutes);

module.exports = api;

