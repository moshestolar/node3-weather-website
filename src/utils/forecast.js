const request = require('request')

const forecast = ( latitude, longitude, callback ) => {
//  const url_location = 'http://api.weatherstack.com/current?access_key=45f4c10273277d4c3c751acc9fe37398&query=' + latitude + ',' + longitude
    const url = 'http://api.weatherstack.com/current?access_key=45f4c10273277d4c3c751acc9fe37398&query=' + latitude + ',' + longitude

//  request( { url: url_location, json: true }, (error, response) => {
    request({ url, json: true }, (error, { body }) => {
            if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error){
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback( undefined, {
               location:         body.location.name,
               weather_nutshell: body.current.weather_descriptions[0],
               temperature:      body.current.temperature,
               feels_like:       body.current.feelslike
            })
            //callback(undefined, body.location.name + ':  ' + body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast
