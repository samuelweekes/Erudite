const mongoose = require('mongoose');
const User = require('./user');
const Study = require('./study');

const DATABASE_URL= `mongodb://localhost:27017/test`;
const connectDb = () => {
  return mongoose.connect(process.env.MONGOLAB_MAROON_URI || DATABASE_URL);
}

module.exports = {
  connectDb : connectDb,
  User : User.User,
  Study : Study.Study,
}
