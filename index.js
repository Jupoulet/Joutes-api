const express = require('express')
const app = express()
const router = express.Router();
const bodyParser = require('body-parser');
global.models = require('./models');
global.Op = models.Sequelize.Op;
// const { Client } = require('pg');
// const url = `postgres://${process.env.DB_USER || 'julien'}:${process.env.DB_PASSWORD || 'toto'}@localhost:5432/joutes`
// 'postgres://pi:root@localhost:5432/joutes
// e.g. postgres://user:password@host:5432/database
// const queryJoutes = 'SELECT joutes.id, created_at, score, winner.firstname as winner, loser.firstname as loser FROM joutes INNER JOIN players AS winner ON winner.id = joutes.winner_id INNER JOIN players AS loser ON loser.id = joutes.loser_id'
// const client = new Client({
//   connectionString: process.env.DATABASE_URL || url,
//   ...(process.env.DATABASE_URL && { ssl: true })
// });

// client.connect();

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// app.use (require ('cors') ({
// 		origin: ['http://localhost:3000', 'https://joutes.herokuapp.com', 'http://joutes.co', 'http://localhost:5000', 'http://192.168.1.10:3000'],
// 	credentials: true
// }))

// app.use('/twilio', require(`${process.env.PWD}/services/twilio.js`))
app.use ('/joutes', require(`${process.env.PWD}/routes/joutes.js`))
app.use ('/players', require(`${process.env.PWD}/routes/players.js`))
// app.get('/joutes', async function (req, res) {
//   const joutes = await models.joutes.findAll()
//   return res.json({ route: 'joutes', joutes })
//   // const joutes = await client.query(queryJoutes);
//   res.json({ joutes: joutes.rows });
// })

app.post('/addJoute', async function (req, res) {
  return res.json({ route: 'addJoute'})

  if (!req.body) { return res.status(403).json({ error: 'Body required'})}
  await client.query(
    'INSERT INTO joutes(loser_id, winner_id, score) VALUES($1, $2, $3) RETURNING *',
    [req.body.loser_id, req.body.winner_id, { winner: 3, loser: req.body.loser_sets }]
  ).then((result) => {
    res.json({ result })
  })

})

app.post('/addPlayer', async function (req, res) {
  return res.json({ route: 'addPlayer'})

  if (!req.body) { return res.status(403).json({ error: 'Body required'})}
  await client.query(
    'INSERT INTO players(firstname, lastname) VALUES($1, $2) RETURNING *',
    [req.body.firstname, req.body.lastname]
  ).then((result) => {
    res.json({ result })
  })
})

app.get('/players', async function (req, res) {
  return res.json({ route: 'players'})

  const players = await client.query('SELECT * FROM players');
  res.json({ players: players.rows })
})

app.listen(process.env.PORT || 4000, function () {
  console.log(`[${process.env.NODE_ENV}]Example app listening on port ${process.env.PORT || 4000}!`)
})

// CREATE TABLE joutes (
//   id          SERIAL PRIMARY KEY,
//   loser_id    integer REFERENCES players(id),
//   winner_id   integer REFERENCES players(id),
//   created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//   score       json
// );

// CREATE TABLE players (
//   firstname  varchar(40),
//   lastname   varchar(40),
//   id         SERIAL PRIMARY KEY
// );

// INSERT INTO players (firstname, lastname) VALUES ('Julien', 'Picard');
// INSERT INTO players (firstname, lastname) VALUES ('Kevin', 'Meignan');
// INSERT INTO players (firstname, lastname) VALUES ('Pierre', 'Kipnisse');


// DROP TABLE players;
