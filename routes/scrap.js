const router = require('express').Router ()
const scrapIt = require(`${process.env.PWD}/services/scrap`)

router.route ('/')
.get(async (req, res) => {
    await scrapIt ()
    res.end()
})

module.exports = router;