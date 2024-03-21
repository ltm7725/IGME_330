const express = require('express')
const app = express()

// localhost:3000
app.get('/', function (req, res) {
  res.send('Hello World')
})

// localhost:3000/random-word
app.get('/random-word', function (req, res) {
    let words = ["apple", "orange", "silence", "jud", "kumquat"];
    let word = words[(Math.floor(Math.random() * words.length))];
    res.send(word)
  })

app.listen(3000)
