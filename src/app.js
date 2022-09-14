const path = require('path') // core node module
const express = require('express') //single function
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
//need to create views folders
app.set('view engine','hbs')
app.set('views',viewPath) 
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

// .get url is first parameter and function second with 2 paramters (req - request, res- response commonly used)
app.get('', (req,res) => {
    res.render("index", {
        title: 'home page',
        name:'Steve Hostetter'
    }) //handlebars templates, second argument is object for values
})

// .get url is first parameter and function second with 2 paramters (req - request, res- response commonly used)
app.get('/about', (req,res) => {
    res.render("about", {
        title: 'about the weather app',
        name:'Steve Hostetter'
    }) //handlebars templates, second argument is object for values
})

// .get url is first parameter and function second with 2 paramters (req - request, res- response commonly used)
app.get('/help', (req,res) => {
    res.render("help", {
        message: 'This page will allow the user to see all things that will be helpful for using the weather application.',
        title: 'about the help app',
        name:'Steve Hostetter'
    }) //handlebars templates, second argument is object for values
})


app.get('/weather', (req, res) => {

    if (!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }

    // CALLBACK CHAINING
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
       
    if (error)
    {
        return res.send({
            error // short hand
        })
    }

    forecast(location, (error, forecastdata) => {
        if (error)
        {
            return res.send({
                error // shorthand
            })
        }   

        res.send({
            forcast: forecastdata,
            location, //shorthand
            address: req.query.address
        })
    })  
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: "You must provide a search team"
        })
    }

    res.send({
        products: []
    })
})

//404 page, has to be last
app.get('/help/*', (req, res) => {
    res.render("404", {
        message: 'Help Article Not Found',
        title: '404 Error',
        name:'Steve Hostetter'
    }) //handlebars templates, second argument is object for values

})

//404 page, has to be last
app.get('*', (req, res) => {
    res.render("404", {
        message: 'Page Not Found',
        title: '404 Error',
        name:'Steve Hostetter'
    }) //handlebars templates, second argument is object for values
})

// app.com
// start up server, local development, default ports of course on sites
app.listen(port, () => {
    console.log ('Server is up on port' + port) // for console to developer
})

//index.html gets served first