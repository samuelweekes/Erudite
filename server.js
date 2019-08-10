const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/addSession', function(req, res){
  console.log(req.body);
});

app.listen(process.env.PORT || 8080, function() {
  console.log('Listening...');
});
