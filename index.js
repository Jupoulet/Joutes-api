const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const { Client } = require('pg');
const url = 'postgres://julien:toto@localhost:5432/joutes'
// e.g. postgres://user:password@host:5432/database
const queryJoutes = 'SELECT joutes.id, created_at, score, winner.firstname as winner, loser.firstname as loser FROM joutes INNER JOIN players AS winner ON winner.id = joutes.winner_id INNER JOIN players AS loser ON loser.id = joutes.loser_id'
const client = new Client({
  connectionString: process.env.DATABASE_URL || url,
  ...(process.env.DATABASE_URL && { ssl: true })
});

client.connect();

app.use(bodyParser.json());
app.use (require ('cors') ({
		origin: ['http://localhost:3000', 'https://joutes.herokuapp.com', 'http://joutes.co'],
	credentials: true
}))


app.get('/joutes', async function (req, res) {
  const joutes = await client.query(queryJoutes);
  res.json({ joutes: joutes.rows });
})

app.post('/addJoute', async function (req, res) {
  if (!req.body) { return res.status(403).json({ error: 'Body required'})}
  await client.query(
    'INSERT INTO joutes(loser_id, winner_id, score) VALUES($1, $2, $3) RETURNING *',
    [req.body.loser_id, req.body.winner_id, { winner: 3, loser: req.body.loser_sets }]
  ).then((result) => {
    res.json({ result })
  })

})

app.post('/addPlayer', async function (req, res) {
  if (!req.body) { return res.status(403).json({ error: 'Body required'})}
  await client.query(
    'INSERT INTO players(firstname, lastname) VALUES($1, $2) RETURNING *',
    [req.body.firstname, req.body.lastname]
  ).then((result) => {
    res.json({ result })
  })
})

app.get('/players', async function (req, res) {
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
