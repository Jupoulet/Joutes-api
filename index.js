const express = require('express')
const app = express()

app.get('/hello', function (req, res) {
  res.json({ message: 'Hello World!'})
})

app.listen(process.env.PORT || 4000, function () {
    console.log('Process.env', process.env.DATABASE_URL)
  console.log(`Example app listening on port ${process.env.PORT || 4000}!`)
})