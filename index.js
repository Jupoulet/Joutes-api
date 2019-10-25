const express = require('express')
const app = express()
const PORT = process.env.PORT;

app.get('/hello', function (req, res) {
  res.json({ message: 'Hello World!'})
})

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`)
})