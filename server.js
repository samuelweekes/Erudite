const express = require('express');
const path = require('path');
const Mongo = require('./models/index');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/study', function(req, res){
  Mongo.Study.find({}, (err, study) => {
    if(err){console.log('Couldn\'t retrieve study sessions')};

    const studyRows = study.map((studySession) => {
      const clone = {...studySession.toObject()}
      clone.time = getTimeFromSeconds(studySession.time);
      let timestamp = new Date(studySession._id.getTimestamp());
      clone.date = `${timestamp.toLocaleDateString()} at ${timestamp.toLocaleTimeString()}`;
      return clone;
    });

    res.send(studyRows);
  });
});

const hardCodedId = '5d4f1b7fd465d35adc4e762b';
app.get('/account', function(req, res){
  Mongo.User.findOne({_id : hardCodedId}, (err, account) => {
    if(err){console.log('Couldn\'t retrieve this account')};
    res.send(account.account);
  });
});

app.post('/study/session', function(req, res){
  Mongo.Study.findOne({_id : req.body.id}, (err, study) => {
    if(err){console.log('Couldn\'t retrieve this account')};
      const clone = {...study.toObject()}
      clone.time = getTimeFromSeconds(study.time);
      let timestamp = new Date(study._id.getTimestamp());
      clone.date = `${timestamp.toLocaleDateString()} at ${timestamp.toLocaleTimeString()}`;
    res.send(clone);
  });
});

app.post('/study/session/edit', function(req, res){
  const updateData = {
    "$set": {
      "time" : getSecondsFromTime(req.body.time),
      "type" : req.body.type,
      "note" : req.body.note,
      }
  }
  Mongo.Study.findByIdAndUpdate(req.body.id, updateData, {new:true}, (err, study) => {
    if(err){
        console.log('There was a problem updating account');
    }
    res.send(study)
  }); 
});

app.post('/study/session/delete', function(req, res){
  Mongo.Study.findByIdAndRemove(req.body.id, (err, study) => {
    if(err){
        console.log('There was a problem updating account');
    }
    res.send(study)
  }); 
});

app.post('/study/session/edit', function(req, res){
  Mongo.Study.findOne({_id : req.body.id}, (err, study) => {
    if(err){console.log('Couldn\'t retrieve this account')};
      const clone = {...study.toObject()}
      clone.time = getTimeFromSeconds(study.time);
      let timestamp = new Date(study._id.getTimestamp());
      clone.date = `${timestamp.toLocaleDateString()} at ${timestamp.toLocaleTimeString()}`;
    res.send(clone);
  });
});

app.post('/reward', function(req, res){
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

app.post('/account', function(req, res){
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

app.post('/account/resetreward', function(req, res){
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

app.post('/account/reset', function(req, res){
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

app.post('/study', async function(req, res){
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
      res.send(study);
    });
  }); 
});

function getSecondsFromTime(time){
  timeParts = time.split(':');
  const hoursToSeconds   = parseInt(timeParts[0]*60*60, 10);
  const minutesToSeconds = parseInt(timeParts[1]*60, 10);
  return hoursToSeconds + minutesToSeconds;
}

function getTimeFromSeconds(seconds){
  const hours = Math.floor((seconds/60)/60);
  const minutes = Math.floor(((seconds/60) - (hours*60)));
  return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
}


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

Mongo.connectDb().then(async () => {
  app.listen(process.env.PORT || 8000, function() {
    console.log(`App listening on port ${process.env.PORT} or on port 8000`);
  });
});
