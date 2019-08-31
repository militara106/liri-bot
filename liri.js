require('dotenv').config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');

var term = process.argv[2];
var name = process.argv.slice(3).join(' ');

function doThing(){
fs.readFile("random.txt","utf8", function read(err, data) {
    if (err) {
        throw err;
    }
    var term = data.slice(data.indexOf('"')+1,data.lastIndexOf('"'));

    console.log(str);
});
}

// Argument Check
switch (term) {
    case "concert-this":
        bandSearch();
        break;
    case "spotify-this-song":
        spotifySearch();
        break;
    case "movie-this":
        movieSearch();
        break;
    case "do-what-it-says":
        spotifySearch();
        break;
}

// CONCERT-THIS
function bandSearch() {
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
function spotifySearch() {
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

            "\nPreview Link: " + response.tracks.items[0].album.href +

            "\nAblum: " + response.tracks.items[0].album.name +

            "\n---------------------------------------"
        );
    });
}

// MOVIE-THIS
function movieSearch() {
    var movieURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + name

    axios.get(movieURL).then(
        function (response) {
            console.log(
                "\n---------------------------------------" +

                "\nTitle: " + name +

                "\nYear: " + moment(response.data.Released).format("MM/DD/YYYY") +

                "\nIMDB Rating: " + response.data.Ratings[0].Value +

                "\nRotten Tomatoes: " + response.data.Ratings[1].Value +

                "\nCountry: " + response.data.Country +

                "\nLanguage: " + response.data.Language +

                "\nPlot: " + response.data.Plot +

                "\nActors: " + response.data.Actors

                +
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