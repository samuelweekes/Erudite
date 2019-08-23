const express = require('express');
const router  = express.Router();
const Mongo   = require('../models/index');
const hardCodedId = process.env.PORT ? '5d59bbcb6cb1fc64ff79ad34': '5d4f1b7fd465d35adc4e762b';

router.post('/', function(req, res){
  Mongo.User.findOne({_id : hardCodedId}, (err, account) => {
    if(err){console.log('Couldn\'t retrieve this account')};
    const newStudy = req.body.data;
    const accountData   = account.account;
    const timeInSeconds = getSecondsFromTime(newStudy.time);
    const bonus         = getBonus(timeInSeconds);
    const reward        = getReward(accountData.balance, accountData.maxBalance, bonus);

    newStudy.time = timeInSeconds;
    newStudy.reward = reward;
  
    const updateData = {
      "$inc": {
        "account.balance" : -(parseInt(reward,10)),
        "account.reward"  : +(parseInt(reward,10)),
        "account.maxReward" : +(parseInt(reward,10))
        }
    }
  
    Mongo.User.findByIdAndUpdate(hardCodedId, updateData, {new:true}, (err) => {
      if(err){
        console.log(err);
        console.log('There was a problem updating account');
      }
    });

    Mongo.Study.create(newStudy, (err, study) => {
      if(err){
        console.log('Couldn\'t add study session');
      }
      // res.send(study);
      res.send(req.user.name);
    });
  }); 
});

function getReward(balance, maxBalance, bonus=false) {
  const max = Math.floor(maxBalance/5);
  const min = Math.floor(maxBalance/35);
  let reward = Math.floor(Math.random() * (max - min) ) + min;
  const percentOfBalance = Math.ceil((reward*100)/maxBalance); 
  
  //Roll on this reward
  const random = Math.floor(Math.random()*100)+1;
  const rewardModifier = Math.ceil(((2/(percentOfBalance))*100));
  
  if(bonus){
    reward = Math.floor(reward * bonus);
  }

  if((balance - reward) < 0) {
    reward = balance;
  }
  
  if(random < rewardModifier){
    return reward;
  }
  return 0;
}

function getBonus(time){
  bonus = 1;
  
  if(time > 7200){
    bonus += (Math.floor(Math.random()*6)/10);
    return bonus;
  }
  if(time > 5400){
    bonus += (Math.floor(Math.random()*4)/10);
    return bonus;
  }
  if(time > 3600){
    bonus += (Math.floor(Math.random()*3)/10);
    return bonus;
  }

  return bonus;
}

function getSecondsFromTime(time){
  timeParts = time.split(':');
  const hoursToSeconds   = parseInt(timeParts[0]*60*60, 10);
  const minutesToSeconds = parseInt(timeParts[1]*60, 10);
  return hoursToSeconds + minutesToSeconds;
}

module.exports = router;