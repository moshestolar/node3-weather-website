const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')               // this sets up the 'handlebars' npm 
app.set('views',  viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) // doesn't make sense yet...

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Moshe Stolar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Moshe Stolar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Press the "Blue Hipo" button to operate the Blue Hipo',
        title: 'Help',
        name: 'Moshe Stolar'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode( req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if (error) {
            return res.send({
                /*
                error: error  // a great case for using shorthand: ...send({error})
                */
                error: error
            })
        }
        
        forecast( latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            
            res.send({
                forecast: forecastData,
                location,       // this is shorthand for   location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Moshe Stolar',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Moshe Stolar',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})