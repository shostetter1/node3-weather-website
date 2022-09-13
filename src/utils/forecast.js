const request = require('request')

const forecast = (location, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=029d7e391c99da171a402329084c9ca5&query=" + encodeURIComponent(location) +  "&units=f"
    request({
        url,
        json:true
    }, (error, {body}) => {
        if (error) {
            callback("Unable to connect to forecast services", undefined)
        }
        else if (body.error)
        {
            callback("Unable to find forecast for " + body.error.info, undefined)
        }
        else
        {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out.  It feels like " + body.current.feelslike+ " degrees out.")
        }
    })
}

module.exports = forecast

/*
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic2xoMTk3NyIsImEiOiJjbDdybTRuN24wOTMyM29ueTdreGI2OTA0In0.p3zDNEx0IKFH-wID6iDJQA&limit=1"
    request({
        url:url,
        json:true
    }, (error, response) => {
        if (error) {
            callback("Unable to connect to location services", undefined)
        }
        else if (response.body.features.length === 0)
        {
            callback("Unable to find location, try another search", undefined)
        }
        else
        {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
*/
/*request({
    url:badURL,
    json:true
},
(error, response) => {
    if (error)
    {
        console.log("Unable to connect to weather service")
    }
    else if (response.body.error) 
    {
        console.log("Unable to find location" + response.body.error.info)
    }
    else
    {
        console.log(response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degrees out.  It feels like " + response.body.current.feelslike+ " degrees out.")
    }
}*/
