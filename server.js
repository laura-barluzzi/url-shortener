var express = require('express');
var hash = require('string-hash');
var tools = require('./tools');
var app = express();

app.get('/new/\*', function (req, res) {
    var originalUrl = req.params["0"];
    var protocol = req.protocol;
    var host = req.get('host');
    
    if (tools.validateUrl(originalUrl)) {
        var strHash = hash(originalUrl).toString()
        var shortUrl = tools.shortenUrl(protocol, host, strHash);
        var result = tools.getResult(originalUrl, shortUrl);
        tools.storeUrls(originalUrl, strHash);
        res.send(JSON.stringify(result));

    } else {
        var error = { "error" : "Invalid URL" };
        res.send(JSON.stringify(error));
    }
});

app.get('/:hash', function(req, res) {
    var hashId = req.params.hash;
    res.redirect(tools.getOriginalUrl(hashId));
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});