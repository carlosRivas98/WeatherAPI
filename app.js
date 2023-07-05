const express = require('express')
const app = express()
const https = require('https');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');   
});

app.post('/', function(req, res) {
const query = req.body.cityName;
const appid = '0beb64461ad621e5a0e47cd033f213ac';
const units = 'metric';
const url = 'https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+appid+'&units='+units+'';
https.get(url, function(response) {
    console.log(response.statusCode);
    response.on('data', function(data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const iconURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
        res.write(`<p>The weather is currently ${description}</p>`);
        res.write(`<h1>The temperature in ${query} is ${temp} degrees Celcius.</h1>`);
        res.write('<img src=' + iconURL + '>');
        res.send();
    });
});
});





app.listen(3000, function() {
    console.log('Server is running on port 3000');
});
