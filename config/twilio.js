module.exports = {
    production: {
        accountSid: 'AC38d3edc42b5a598771b42accabac6e8a',
        authToken: '16224b8672bc805abaa3ed37bc0214be',
        phoneNumber: '+18106440032'
    }
}[process.env.NODE_ENV] || {
    accountSid: 'AC95ad865f0fd282f4eef01b26bf3ce770',
    authToken: 'a836208a5493a875656e4ff36cab4bfc',
    phoneNumber: '+15005550006'
}