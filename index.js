const express = require('express')
const app = express()

app.get('/hello', function (req, res) {
  res.json({ message: 'Hello World!'})
})

app.listen(process.env.PORT || 4000, function () {
  console.log(`Example app listening on port ${process.env.PORT || 4000}!`)
})