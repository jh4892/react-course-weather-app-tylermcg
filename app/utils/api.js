var axios = require("axios");

var apiKey = "1e450e0d69d76b9d5d822bc8d85863e2";

// https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=1e450e0d69d76b9d5d822bc8d85863e2

// Those two endpoints are,
// Current Weather: http://api.openweathermap.org/data/2.5/weather?q=CITY-NAME&type=accurate&APPID=YOUR-API-KEY
// 5 Day Forecast: http://api.openweathermap.org/data/2.5/forecast/daily?q=CITY-NAME&type=accurate&APPID=YOUR-API-KEY&cnt=5

module.exports = {
  getCurrentWeather: function(city) {
    var encodedURI = window.encodeURI(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&type=accurate&APPID=" +
        apiKey
    );

    // console.log(encodedURI);

    return axios.get(encodedURI).then(function(response) {
      return response.data;
    });
  },
  get5dayForecast: function(city) {
    // // api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=xml&units=metric&cnt=7
    // var encodedURI = window.encodeURI(
    //   "https://api.openweathermap.org/data/2.5/forecast/daily?q=" +
    //     city +
    //     "&type=accurate&APPID=" +
    //     apiKey +
    //     "&cnt=15"
    // );

    var encodedURI = window.encodeURI(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&type=accurate&APPID=" +
        apiKey +
        "&cnt=15"
    );

    console.log(encodedURI);

    return axios.get(encodedURI).then(function(response) {
      return response.data;
    });
  }
};
