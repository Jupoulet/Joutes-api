const axios = require('axios');
const fs = require('fs').promises;

const showLastRun = async () => {
    let data = await fs.readFile (`${process.env.PWD}/assets/runs.json`, 'utf8')
    let runs = data ? JSON.parse(data).runs : []

    const { kms, duration } = runs.reverse()[0] || {}

    await axios.post("http://192.168.1.20:8080/api/v2/device/notifications", {
        "lifeTime": 15000,
        "icon_type": "none",
        "model": {
            "frames": [
                {
                    "icon":22835,
                    "text":"Dernier run:"
                },
                {
                    "icon":14997,
                    "text": `${kms} kms, en ${duration}`
                }
            ],
            "sound": {
            "category":"notifications",
            "id":"positive2",
            "repeat":1
            }
        }
    }, {
        headers: {
            "Authorization": "Basic ZGV2OmYyNTI3MGE0NTk1YzA3ZGZiMzZlMDM5MTljZTk4YmViNzE3NzMxM2Q1YWEwNDBjYWY4MzU0NTJkMmRkYzY0OWU=",
            "Content-Type": "application/json"
        },
    })
}

module.exports = { showLastRun }