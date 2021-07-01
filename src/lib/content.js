const bodyParser = require('./body-parser');

module.exports.create = function (fse, result, template, contentDir) {
    const body = bodyParser.getBody(result.response);
    const sign = result.page.replace('.html', '');
    const dirName = contentDir + '/' + sign + '/daily';
    const fileName = dirName + '/index.html';

    fse.ensureDirSync(dirName);
    const signCapitalized = sign.charAt(0).toUpperCase() + sign.slice(1);
    let content = template.replace(/%sign%/g, signCapitalized);

    for (const [key, value] of Object.entries(body)) {
        content = content.replace('%' + key + '%', value);
    }
    fse.writeFile(fileName, content);
};