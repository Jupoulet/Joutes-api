const express = require('express')
const app = express()
const router = express.Router();
const bodyParser = require('body-parser');
global.models = require('./models');
global.Op = models.Sequelize.Op;

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use ('/joutes', require(`${process.env.PWD}/routes/joutes.js`))
app.use ('/players', require(`${process.env.PWD}/routes/players.js`))
app.use ('/scrap', require(`${process.env.PWD}/routes/scrap.js`))


app.listen(process.env.PORT || 4000, function () {
  console.log(`[${process.env.NODE_ENV}]Example app listening on port ${process.env.PORT || 4000}!`)
})
