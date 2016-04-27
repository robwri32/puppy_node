const express = require('express');
const app = express();



app.listen(3000, function() {
  console.log('listening on 3000')
})

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  // Note: __dirname is the path to your current working directory. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})
