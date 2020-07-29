const router = require('express').Router ()
const scrapIt = require(`${process.env.PWD}/services/scrap`)

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

module.exports = router;
