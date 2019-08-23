const express = require('express');
const router  = express.Router();
const Mongo   = require('../models/index');
const hardCodedId = process.env.PORT ? '5d59bbcb6cb1fc64ff79ad34': '5d4f1b7fd465d35adc4e762b';

router.get('/', function(req, res){
  res.send(req.user.name);
  // Mongo.User.findOne({_id : hardCodedId}, (err, account) => {
    // if(err){console.log('Couldn\'t retrieve this account')};
    // res.send(account.account);
  // });
});

router.post('/', function(req, res){
  res.send(req.user.name);
  // const updateData = {
  //   "$inc": {
  //     "account.balance" : req.body.balance,
  //     "account.maxBalance" : req.body.balance
  //     }
  // }
  // Mongo.User.findByIdAndUpdate(hardCodedId, updateData, {new:true}, (err, account) => {
  //   if(err){
  //       console.log('There was a problem updating account');
  //   }
  //   res.send(account.account)
  // }); 
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