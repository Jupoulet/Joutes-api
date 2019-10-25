const express = require('express')
const app = express()

app.get('/hello', function (req, res) {
  res.json({ message: 'Hello World!'})
})

app.listen(4000, function () {
  console.log('Example app listening on port 4000!')
})