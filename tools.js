var urls = {};

module.exports = {
    
    validateUrl: function (url) {
        return !!url.match(new RegExp("^http(s)?://(.)*\.com$"));
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