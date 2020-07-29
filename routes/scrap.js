const router = require('express').Router ()
const scrapIt = require(`${process.env.PWD}/services/scrap`)
const { showLastRun } = require(`${process.env.PWD}/services/lametric`)

router.route ('/')
.get(async (req, res) => {
    console.log ('Scrap it !')
    try {
      await scrapIt ();
    } catch (err) {
      console.log (err)
    }
    console.log ('Done scraping')
    res.end()
})

router.route ('/last')
.get(async (req, res) => {
    await showLastRun ()
    res.end()
})

module.exports = router;
