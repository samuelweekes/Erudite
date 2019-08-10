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
})

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

app.post('/study', function(req, res){
  const newStudy      = req.body.data;
  const maxBalance    = 400;
  const timeInSeconds = getSecondsFromTime(newStudy.time);
  const bonus         = getBonus(timeInSeconds);
  const reward        = getReward(maxBalance, bonus);

  newStudy.time = timeInSeconds;
  newStudy.reward = reward;

  const updateData = {
    "$inc": {
      "account.balance" : -(parseInt(reward,10)),
      "account.maxBalance" : -(parseInt(reward,10))
      }
  }

  Mongo.User.findByIdAndUpdate(hardCodedId, updateData, {new:true}, (err, account) => {
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


function getReward(maxBalance, bonus=false) {
  const max = Math.floor(maxBalance/5);
  const min = Math.floor(maxBalance/35);
  let reward = Math.floor(Math.random() * (max - min) ) + min;
  const percentOfBalance = Math.ceil((reward*100)/maxBalance); 
  
  //Roll on this reward
  const random = Math.floor(Math.random()*100)+1;
  const rewardModifier = Math.ceil(((2/(percentOfBalance))*100));
  
  //Modify bonus, up to 1.5 as a max
  if(bonus){
    reward = reward * bonus;
  }
  
  if(random < rewardModifier){
    return reward;
  }
  return 0;
}

function getBonus(time){
  bonus = 1;
  
  if(time > 7200){
    bonus = Math.floor(Math.random()*6)+1;
    return bonus;
  }
  if(time > 5400){
    bonus = Math.floor(Math.random()*4)+1;
    return bonus;
  }
  if(time > 3600){
    bonus = Math.floor(Math.random()*3)+1;
    return bonus;
  }

  return bonus;
}

Mongo.connectDb().then(async () => {
  app.listen(process.env.PORT || 8080, function() {
    console.log(`App listening on port ${process.env.PORT} or on port 8080`);
  });
})
