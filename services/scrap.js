const puppeteer = require('puppeteer');
const fs = require ('fs');
const { showLastRun } = require(`${process.env.PWD}/services/lametric`)

const scrapIt = async () => {
    const browser = await puppeteer.launch({
        ...(process.env.NODE_ENV === 'production' && {
            args: ['--no-sandbox','--disable-setuid-sandbox'],
            executablePath: '/usr/bin/chromium-browser'
        })
    });

    const page = await browser.newPage();

    await page.goto('https://mysports.tomtom.com/app/login/?locale=fr_fr', { waitUntil: 'networkidle0' });
    await page.click ('#acceptCookiesButton')


    await page.type('#email', 'julien.picard@mail.novancia.fr')
    await page.type('#password', 'Smashfootball1492!')

    await Promise.all([
        page.click('#logInButton'),
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
    ]);

    await page.goto('https://mysports.tomtom.com/app/activities/?locale=fr_fr')
    await page.waitFor ('.activityList-group-header')

    let kms = await page.$eval ('.activity-items > activity-item > div > a > div[class="metrics"] > div[class*="metric-distance"] > div:first-child > div:first-child', el => el.innerHTML)
    let date = await page.$eval ('.activity-date-value', el => el.innerHTML)
    let duration = await page.$eval ('.metric-duration > div > div:first-child', el => el.innerHTML)
    await browser.close();

    let lastRun = {
        id: `${kms}-${date}-${duration}`,
        kms,
        date,
        duration
    }

    fs.readFile (`${process.env.PWD}/assets/runs.json`, 'utf8', (err, data) => {
        data = data ? JSON.parse(data) : []
        if (data.runs.some(r => r.id === lastRun.id)) return;

        data.runs.push ({ kms, date, duration, id: `${kms}-${date}-${duration}` })
        fs.writeFile (`${process.env.PWD}/assets/runs.json`, JSON.stringify(data), async (err, data) => {
            try {
                await showLastRun()
            } catch (error) {
                console.log ('error', error)
                
            }
                        
        })
    })

	return { kms, date, duration }

}

module.exports = scrapIt;