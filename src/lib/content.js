const bodyParser = require('./body-parser');

module.exports.create = function (fse, result, data) {
    const body = bodyParser.getBody(result.response);
    const sign = result.page.replace('.html', '');

    for (let i = 0, l = data.length; i < l; i++) {
        const dirName = data[i].contentDir + '/' + sign + '/daily';
        const fileName = dirName + '/index.html';

        fse.ensureDirSync(dirName);
        const signCapitalized = sign.charAt(0).toUpperCase() + sign.slice(1);
        let content = data[i].template.replace(/%sign%/g, signCapitalized);

        for (const [key, value] of Object.entries(body)) {
            content = content.replace('%' + key + '%', value);
        }
        fse.writeFile(fileName, content);
    }
};