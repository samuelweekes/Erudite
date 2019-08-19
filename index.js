const express = require('express');
const path = require('path');
const Mongo = require('./models/index');
const studyRoutes   = require('./routes/study');
const accountRoutes = require('./routes/account');
const sessionRoutes = require('./routes/session');
const statRoutes    = require('./routes/stat');
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use('/data/study', studyRoutes);
app.use('/data/account', accountRoutes);
app.use('/data/session', sessionRoutes);
app.use('/data/stat', statRoutes);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

Mongo.connectDb().then(async () => {
  app.listen(process.env.PORT || 8000, function() {
    console.log(`App listening on port ${process.env.PORT} or on port 8000`);
  });
});
