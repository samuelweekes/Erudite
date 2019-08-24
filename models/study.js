const mongoose = require('mongoose');

const studySchema = new mongoose.Schema({
  username : String,
  time : Number,
  type : String,
  note : String,
  reward: Number,
});

const Study = mongoose.model('Study', studySchema);
exports.Study = Study;