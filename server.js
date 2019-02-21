const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const path = require('path')
const app = express();
const BASE_URL = 'https://api.instagram.com/v1/users'
app.use(express.static(path.join(__dirname, 'build')));
app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
app.get('/owner-info', (req, res) => {
    return request(`${BASE_URL}/self/?access_token=1642314104.609f4f8.28c2ae0f396e4a0dbf8c64ff5d6a9037`, function(error, response, body) {
        console.log(body)
        return res.send(body)
    });
});

app.listen(8080, () => console.log('image viewer app listening on port 8080!'));
