var express = require('express');
var hash = require('string-hash');
var app = express();

function checkValidity(url) {
    var hasDotCom = url.substr(url.length - 4, 4) === '.com';
    var isHttp = url.substr(0, 11) === 'http://www.' && hasDotCom;
    var isHttps = url.substr(0, 12) === 'https://www.' && hasDotCom;
    return (isHttp || isHttps) ? true : false;
}
app.get('/new/\*', function (req, res) {
    var paramUrl = req.params["0"];
    var urlIsValid = checkValidity(paramUrl);
    
    if (urlIsValid) {
        var strHash = hash(paramUrl).toString();
        var shortUrl = req.protocol + "://" + req.get('host') + "/" + strHash;
        var urls = { "original-url" :  paramUrl, 
                     "shorter-url" : shortUrl
                   }
        res.send(JSON.stringify(urls));

    } else {
        var error = { "error" : "Invalid URL" };
        res.send(JSON.stringify(error));
    }
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});