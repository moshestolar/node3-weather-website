const request = require('request')

const geocode = (address, callback) => {
//  const url_location = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYmx1ZWhpcG8iLCJhIjoiY2trdjdlbjdvMTVnajJvcGkycmZjb3gxaiJ9.oH2eOqGo41_r_h_HgJpE3g&limit=1'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYmx1ZWhpcG8iLCJhIjoiY2trdjdlbjdvMTVnajJvcGkycmZjb3gxaiJ9.oH2eOqGo41_r_h_HgJpE3g&limit=1'
    
    request( { url, json: true }, (error, { body }) => {
        if (error) {
            callback( 'Unable to connect to location services!', undefined )
        } else if (body.features.length === 0 ) {
            callback( 'Unable to find location. Try another search.', undefined )
        } else {
            callback( undefined, {
                latitude:  body.features[0].center[1], //center[1]=latitude
                longitude: body.features[0].center[0], //center[0]=longitude
                location:  body.features[0].place_name
            })
        }
    } )
}

module.exports = geocode