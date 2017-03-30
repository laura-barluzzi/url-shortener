var hash = require('string-hash');
var urls = {};

module.exports = {
    
    validateUrl: function (url) {
        var hasDotCom = url.substr(url.length - 4, 4) === '.com';
        var isHttp = url.substr(0, 11) === 'http://www.' && hasDotCom;
        var isHttps = url.substr(0, 12) === 'https://www.' && hasDotCom;
        return (isHttp || isHttps) ? true : false;
    },

    createShortUrl: function (protocol, host, strToHash) {
        return protocol + "://" + host + "/" + hash(strToHash).toString();
    },

    storeUrls: function (original, shortUrl) {
        urls[shortUrl] = original;
        console.log(urls);
    },

    getLongUrl: function (shortUrl) {
        return urls[shortUrl];
    },

    getResult: function (original, shortUrl) {
        return { "original_url" : original, "short_url" : shortUrl }
  }
};