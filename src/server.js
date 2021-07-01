const fse = require('fs-extra');
const requestPromises = require('./lib/request-promises');
const content = require('./lib/content');

const contentDir = __dirname + '/content';
const url = 'https://www.astrology.com/horoscope/daily/';
const pages = [
    'aries.html',
    'taurus.html',
    'gemini.html',
    'cancer.html',
    'leo.html',
    'virgo.html',
    'libra.html',
    'scorpio.html',
    'sagittarius.html',
    'capricorn.html',
    'aquarius.html',
    'pisces.html'
];

let promisses = requestPromises.get(url, pages);
const template = fse.readFileSync(__dirname + '/template.html', 'utf8')

fse.ensureDirSync(contentDir);
Promise.all(promisses).then(results => {
    results.forEach((result) => {
        content.create(fse, result, template, contentDir);
        console.log(result.page + ' page created!')
    });

    console.log('END');
}).catch(err => {
    console.log(err);
});
