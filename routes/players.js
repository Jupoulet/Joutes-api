const router = require('express').Router()

router.route('/')
.get(async (req, res) => {
    const players = await models.players.findAll()
    return res.json({ route: 'players', players })
})
.post (async (req, res) => {
    console.log("Adding player", req.body);
    if (!req.body || !Object.keys(req.body).length) { return res.status(301).json("Body required") }
    //[req.body.loser_id, req.body.winner_id, { winner: 3, loser: req.body.loser_sets }]
    await models.players.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname
    })

    return res.json({ success: true })
})
module.exports = router