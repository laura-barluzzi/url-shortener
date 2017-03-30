var urls = {};

module.exports = {
    
    validateUrl: function (url) {
        var hasDotCom = url.substr(url.length - 4, 4) === '.com';
        var isHttp = url.substr(0, 11) === 'http://www.' && hasDotCom;
        var isHttps = url.substr(0, 12) === 'https://www.' && hasDotCom;
        return (isHttp || isHttps) ? true : false;
    },

    shortenUrl: function (protocol, host, hash) {
        return protocol + "://" + host + "/" + hash;
    },

    storeUrls: function (original, hash) {
        urls[hash] = original;
        console.log(urls);
    },

    getOriginalUrl: function (hash) {
        return urls[hash];
    },

    getResult: function (original, shortUrl) {
        return { "original_url" : original, "short_url" : shortUrl }
  }
};