require('dotenv').config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require('axios');
var moment = require('moment');

var term = process.argv[2];
var name = process.argv.slice(3).join(' ');

// CONCERT-THIS
if (term == "concert-this") {
    var bandURL = "https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp";

    axios.get(bandURL).then(
        function (response) {
            console.log(
                "\n---------------------------------------" +

                "\nBand/Artist: " + name +

                "\nVenue: " + response.data[0].venue.name +

                "\nLocation: " + response.data[0].venue.city + ", " + response.data[0].venue.region +

                "\nDate: " + (moment(response.data[0].datetime).format("MM/DD/YYYY")) +
                "\n---------------------------------------"
            );
        }
    ).catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
        }
        console.log(error.config);
    });

}

// SPOTIFY-THIS-SONG
else if (term == 'spotify-this-song') {
    spotify.search({
        type: 'track',
        query: name
    }, function (err, response) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var artists = [];
        for (var i = 0; i < response.tracks.items[0].album.artists.length; i++) {
            artists.push(response.tracks.items[0].album.artists[i].name);
        }

        console.log(
            "\n---------------------------------------" +
            "\nArtist(s): " + artists.join(', ') +
            "\nTrack: " + name +
            "\nPreview Link: " + response.tracks.items[0].album.href+
            "\nAblum: " + response.tracks.items[0].album.name +
            "\n---------------------------------------"
        );
    });
}

// MOVIE-THIS
else if(term == "movie-this")