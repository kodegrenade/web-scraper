const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()
const PORT = 7000

const url = "https://punchng.com/"

axios(url).then(response => {
    const html = response.data
    const $ = cheerio.load(html)
    const headlines = []

    $('.entry-item-simple', html).each(function() {
        const title = $(this, '.entry-title').text()
        const link = $(this).find('a').attr('href')
        headlines.push({
            title,
            link
        })
    })
    console.log(headlines);
}).catch(err => {
    console.log(err)
});

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))