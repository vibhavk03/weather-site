const request = require('request');

const getForecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=03c180947d0ada94add4d1de2143d3cf&query=' + (latitude) + ',' + (longitude);
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is ' 
            + body.current.temperature + ' degrees out. It feels like ' 
            + body.current.feelslike + ' degree out. The cloud cover is '+ body.current.cloudcover
            + '%. The UV index out is ' + body.current.uv_index + '.');
        }
    })
}

module.exports=getForecast;

// const urlWeatherStack = 'http://api.weatherstack.com/current?access_key=03c180947d0ada94add4d1de2143d3cf&query=28.7041,77.1025';
// this is making request, it takes two parameters
// an options object (available in API Docs) and a callback fuction
// callback function is there to know what to do with response and error
// request({url: urlWeatherStack, json: true}, (error, response) => {
//     // const data = JSON.parse(response.body);
//     // console.log(data.current);
//     // we will directly get parsed data now
//     // console.log(response.body.current);
//     if (error) {
//         console.log('Unable to connect to weather service!');
//     } else if (response.body.error) {
//         console.log('Unable to find location');
//     } else {
//         console.log(response.body.current.weather_descriptions[0] + '. It is ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degree out.')
//     }
// })