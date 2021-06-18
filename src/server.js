const express = require('express');
const app = express();

const got = require('got');
const htmlParser = require('node-html-parser');
const iconv = require('iconv-lite');

const port = 8080;
const url = 'https://www.astrology.com/horoscope/daily/';

app.get('/', (req, res) => {

    got(url + 'sagittarius.html').then(response => {
        const root = htmlParser.parse(response.body);
        const commonText = root.querySelector('div.grid-md-c-s2').textContent;
        const loveText = root.querySelector('#content-love').textContent;
        const workText = root.querySelector('#content-work').textContent;

        const body = commonText + "<br>" + loveText + "<br>" + workText;

        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.write(body, "utf-8");
        res.end();
    }).catch(err => {
        console.log(err);
        res.end(err.toString());
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
