var express = require('express');
var app = express();

function checkValidity(url) {
    var hasDotCom = url.substr(url.length - 4, 4) === '.com';
    var isHttp = url.substr(0, 11) === 'http://www.' && hasDotCom;
    var isHttps = url.substr(0, 12) === 'https://www.' && hasDotCom;
    return (isHttp || isHttps) ? true : false;
}
app.get('/new/\*', function (req, res) {
    var paramUrl = req.params["0"]; // type string
    var urlIsValid = checkValidity(paramUrl);
    res.send(urlIsValid);
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});