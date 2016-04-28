const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://robwri32:halo3232@ds021761.mlab.com:21761/puppy_node', function(err, database){
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 3000, function() {
    console.log('listening on 3000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', function(req, res) {
  db.collection('quotes').find().toArray(function(err, result) {
    if (err) return console.log(err)
    res.render('index.ejs', {quotes: result})
  })
})

app.post('/quotes', function(req, res) {
  db.collection('quotes').save(req.body, function(err, result){
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/quotes', function(req, res) {
  db.collection('quotes')
  .findOneAndUpdate({name: 'Yoda'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, function(err, result) {
    if (err) return res.send(err)
    res.send(result)
  })
})



app.get('/add_user', function(req, res){
  res.sendFile(__dirname + '/add_user.html')
});


app.post('/add_user', function(req, res) {
  db.collection('users').save(req.body, function(err, result) {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

app.get('/add_puppy', function(req, res){
  res.sendFile(__dirname + '/add_puppy.html')
});

app.get('/view_puppies', function(req, res) {
  db.collection('puppies').find().toArray(function(err, result) {
    if (err) return console.log(err)
    res.render('view_puppies.ejs', {puppies: result})
  })
})




app.post('/add_puppy', function(req, res) {
  db.collection('puppies').save(req.body, function(err, result) {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})
