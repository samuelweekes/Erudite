const express = require('express');
const router  = express.Router();
const Mongo   = require('../models/index');
const hardCodedId = process.env.PORT ? '5d59bbcb6cb1fc64ff79ad34': '5d4f1b7fd465d35adc4e762b';

const addUser = function(req, res, next){
  Mongo.User.findOne({_id : req.body.id}, (err, account) => {
    if(!account){
      const user = { 
        username: 'Test',
        password: '123pass',
        account: {balance : 0,
          maxBalance: 0,
          reward: 0,
          maxReward: 0
        }
      }
      Mongo.User.create(user, (err, newUser) => {
        console.log('Made a new user');
        next();
      });
    } else {
      next();
    }
  })
}

router.get('/', function(req, res){
  Mongo.User.findOne({_id : req.body.id}, (err, account) => {
    if(!err){
      res.send(account.account);
    } else {
      console.log('Couldn\'t retrieve this account')
    }
  });
});

router.post('/', addUser, function(req, res){
  const updateData = {
    "$inc": {
      "account.balance" : req.body.balance,
      "account.maxBalance" : req.body.balance
      }
  }
  Mongo.User.findByIdAndUpdate(hardCodedId, updateData, {new:true}, (err, account) => {
    if(err){
        console.log('There was a problem updating account');
    }
    res.send(account.account)
  }); 
});

router.post('/reset', function(req, res){
  const updateData = {
    "$set": {
      "account.balance" : 0,
      "account.maxBalance" : 0
      }
  }
  Mongo.User.findByIdAndUpdate(hardCodedId, updateData, {new:true}, (err, account) => {
    if(err){
        console.log('There was a problem updating account');
    }
    res.send(account.account)
  }); 
});

router.post('/reward', function(req, res){
  const updateData = {
    "$inc": {
      "account.reward"    : req.body.balance,
      "account.maxReward" : req.body.balance > 0 ? req.body.balance : 0
      }
  }
  Mongo.User.findByIdAndUpdate(hardCodedId, updateData, {new:true}, (err, account) => {
    if(err){
        console.log('There was a problem updating account');
    }
    res.send(account.account)
  }); 
});

router.post('/resetreward', function(req, res){
  const updateData = {
    "$set": {
      "account.maxReward" : 0
      }
  }
  Mongo.User.findByIdAndUpdate(hardCodedId, updateData, {new:true}, (err, account) => {
    if(err){
        console.log('There was a problem updating account');
    }
    res.send(account.account)
  }); 
});

module.exports = router;