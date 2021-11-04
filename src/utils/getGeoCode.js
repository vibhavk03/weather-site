const request = require('request');

// using es6 object notation
const getGeoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidmliaGF2ayIsImEiOiJja3Zha2JqamowMXlwMndvOHl5NGZhNTQ2In0.OAlhMkRrQnaoy73BXNRN8Q&limit=1';
    request({ url, json: true, strictSSL: false}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to location service!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location! Please try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = getGeoCode;

// const getGeoCode = (address, callback) => {
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidmliaGF2ayIsImEiOiJja3Zha2JqamowMXlwMndvOHl5NGZhNTQ2In0.OAlhMkRrQnaoy73BXNRN8Q&limit=1';
//     request({url: url, json: true, strictSSL: false}, (error, response) => {
//         if (error) {
//             callback('Unable to connect to location service!', undefined);
//         } else if (response.body.features.length === 0) {
//             callback('Unable to find location! Please try another search.', undefined);
//         } else {
//             callback(undefined, {
//                 latitude: response.body.features[0].center[1],
//                 longitude: response.body.features[0].center[0],
//                 location: response.body.features[0].place_name
//             })
//         }
//     })
// }