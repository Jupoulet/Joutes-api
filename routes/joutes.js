const router = require('express').Router()

router.route('/')
.get(async (req, res) => {
    const joutes = await models.joutes.findAll({
        include: [
            {
                model: models.players,
                as: 'winner',
                attributes: ['firstname']
            },
            {
                model: models.players,
                as: 'loser',
                attributes: ['firstname']
            }
        ]
    }).map((joute) => {
        return {
            ...joute.dataValues,
            winner: joute.winner.firstname,
            loser: joute.loser.firstname
        }
    })
    return res.json({ route: 'joutes', joutes })
})
.post (async (req, res) => {
    console.log("Adding joutes", req.body);
    if (!req.body || !Object.keys(req.body).length) { return res.status(301).json("Body required") }
    await models.joutes.create({
        loser_id: req.body.loser_id,
        winner_id: req.body.winner_id,
        score: {
            winner: 3,
            loser: req.body.loser_sets
        }
    })

    return res.json({ message: "Joute added"})
})
module.exports = router