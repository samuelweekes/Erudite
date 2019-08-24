const express = require('express');
const path = require('path');
const Mongo = require('./models/index');
const api   = require('./routes/api');
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use('/data', api);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

Mongo.connectDb().then(async () => {
  app.listen(process.env.PORT || 8000, function() {
    console.log(`App listening on port ${process.env.PORT} or on port 8000`);
  });
});
