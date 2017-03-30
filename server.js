var express = require('express');
var tools = require('./tools');
var app = express();

app.get('/new/\*', function (req, res) {
    var paramUrl = req.params["0"];
    var protocol = req.protocol;
    var host = req.get('host');
    var urlIsValid = tools.validateUrl(paramUrl);
    
    if (urlIsValid) {
        var shortUrl = tools.createShortUrl(protocol, host, paramUrl);
        tools.storeUrls(paramUrl, shortUrl);
        var result = tools.getResult(paramUrl, shortUrl);
        res.send(JSON.stringify(result));

    } else {
        var error = { "error" : "Invalid URL" };
        res.send(JSON.stringify(error));
    }
});


app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});