const got = require('got');

module.exports.get = function (url, pages) {
    let promisses = [];
    pages.forEach((page) => {
        let p = got(url + page).then((response) => {
            return {"page": page, "response": response};
        });
        promisses.push(p);
    });

    return promisses;
};