const express = require('express');
const router  = express.Router();
const Mongo   = require('../models/index');

router.get('/', function(req, res){
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

router.get('/:id', function(req, res){
  Mongo.Study.findOne({_id : req.params.id}, (err, study) => {
    if(err){console.log('Couldn\'t retrieve this account')};
      const clone = {...study.toObject()}
      clone.time = getTimeFromSeconds(study.time);
      let timestamp = new Date(study._id.getTimestamp());
      clone.date = `${timestamp.toLocaleDateString()} at ${timestamp.toLocaleTimeString()}`;
    res.send(clone);
  });
});

router.post('/edit', function(req, res){
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

router.delete('/delete', function(req, res){
  Mongo.Study.findByIdAndRemove(req.body.id, (err, study) => {
    if(err){
        console.log('There was a problem updating account');
    }
    res.send(study)
  }); 
});

function getTimeFromSeconds(seconds){
  const hours = Math.floor((seconds/60)/60);
  const minutes = Math.floor(((seconds/60) - (hours*60)));
  return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
}

function getSecondsFromTime(time){
  timeParts = time.split(':');
  const hoursToSeconds   = parseInt(timeParts[0]*60*60, 10);
  const minutesToSeconds = parseInt(timeParts[1]*60, 10);
  return hoursToSeconds + minutesToSeconds;
}

module.exports = router;