const express = require('express');
const bodyParser= require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));



app.listen(3000, function() {
  console.log('listening on 3000')
});

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.get('/add_user', (req, res) => {
  res.sendFile(__dirname + '/add_user.html')
});

app.post('/add_user', (req, res) => {
   console.log(req.body)
});
