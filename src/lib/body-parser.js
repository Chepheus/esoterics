const htmlParser = require('node-html-parser');
const date = require('date-and-time');

module.exports.getBody = function (response)
{
    const root = htmlParser.parse(response.body);
    const commonText = root.querySelector('div.grid-md-c-s2').textContent;
    const loveText = root.querySelector('#content-love').textContent;
    const workText = root.querySelector('#content-work').textContent;
    const datingText = root.querySelector('#content-dating').textContent;
    const bonusText = root.querySelector('#content-bonus').textContent;

    return {
        'commonText': commonText.replace(/[\n\t\r]/g,""),
        'loveText': loveText.replace(/[\n\t\r]/g,""),
        'workText': workText.replace(/[\n\t\r]/g,""),
        'datingText': datingText.replace(/[\n\t\r]/g,""),
        'bonusText': bonusText.replace(/[\n\t\r]/g,""),
        'dateNow': date.format(new Date(), 'MMMM D, YYYY')
    };
}