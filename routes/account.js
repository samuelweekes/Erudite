const express = require('express');
const router  = express.Router();
const Mongo   = require('../models/index');

router.get('/', function(req, res){
  Mongo.User.findOne({username : req.user.name}, (err, account) => {
    if(!err){
      res.send(account.account);
    } else {
      console.log('Couldn\'t retrieve this account')
    }
  });
});

router.post('/', function(req, res){
  const updateData = {
    "$inc": {
      "account.balance" : req.body.balance,
      "account.maxBalance" : req.body.balance
      }
  }
  Mongo.User.findOneAndUpdate({username : req.user.name}, updateData, {new:true}, (err, account) => {
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
  Mongo.User.findOneAndUpdate({username : req.user.name}, updateData, {new:true}, (err, account) => {
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
  Mongo.User.findOneAndUpdate({username : req.user.name}, updateData, {new:true}, (err, account) => {
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
  Mongo.User.findOneAndUpdate({username : req.user.name}, updateData, {new:true}, (err, account) => {
    if(err){
        console.log('There was a problem updating account');
    }
    res.send(account.account)
  }); 
});

module.exports = router;