const fse = require('fs-extra');
const requestPromises = require('./lib/request-promises');
const content = require('./lib/content');
const CORE_DIR = __dirname + '/../..';

// const contentDir1 = CORE_DIR + '/horoscope'; // PROD PATH
// const contentDir = __dirname + '/horoscope';
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
// const template1 = fse.readFileSync(__dirname + '/template1.html', 'utf8');
// const template2 = fse.readFileSync(__dirname + '/template2.html', 'utf8');

const data = [
    {
        // 'contentDir': CORE_DIR + '/horoscope',
        'contentDir': CORE_DIR + '/horoscope',
        'template': fse.readFileSync(__dirname + '/template1.html', 'utf8')
    },
    {
        'contentDir': CORE_DIR + '/weeklysubscription/horoscope',
        'template': fse.readFileSync(__dirname + '/template2.html', 'utf8')
    }
];

Promise.all(promisses).then(results => {
    results.forEach((result) => {
        content.create(fse, result, data);
        console.log(result.page + ' page created!')
    });

    console.log('END');
}).catch(err => {
    console.log(err);
});
