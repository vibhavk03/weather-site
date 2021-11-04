const path = require('path'); //default node package
const express = require('express');
const hbs = require('hbs');
const getGeoCode = require('./utils/getGeoCode')
const getForecast = require('./utils/getForecast')

const app  = express();

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// for setting handlebars engine and views location 
app.set('view engine', 'hbs'); // to use templating engine
app.set('views', viewsPath); // if we change views folder, we have to define the path
hbs.registerPartials(partialsPath);

// set up static directory to serve
app.use(express.static(publicDirectoryPath))

// route handlers
app.get('', (req, res) => { // for home page
    res.render('index', { // passing what we need as object
        title: 'Weather',
        name: 'Vibhav'
    });
})

app.get('/about', (req, res) => {
    res.render('about', { 
        title: 'About me',
        name: 'Vibhav'
    });
})

app.get('/help', (req, res) => {
    res.render('help', { 
        title: 'Help',
        name: 'Vibhav',
        msg: 'Help me!'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    const address = req.query.address;

    getGeoCode(address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        }
        getForecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            return res.send({
                location: location,
                forecastData: forecastData,
                address: req.query.address
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        msg: 'Help article not found!'
    });
})

app.get('/products', (req, res) => {
    // if we have no search query
    if(!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products:[]
    })
})

// 404 page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        msg: 'Page not found!'
    });
})

// used to start the server
app.listen(3000, () => {
    console.log('Server is up and running on port 3000');
})

// we also pass a callback function which runs when the server starts

// we are using a template engine called handlebars
// hbs is a handlebars extension which makes it easy to work with express

// this is for app.com
// we can also provide for app.com/about or app.com/help
// this is a handler for home page
// this is never used as we serve up index.HTML
// req - request, res - response
// app.get('', (req, res) => {
//     res.send('<h1>Hello Express!</h1>');
// })

// app.get('/help', (req, res) => {
//     res.send( {
//         name: 'Vibhav',
//         age: 22
//     } );
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About page</h1>');
// })