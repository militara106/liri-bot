require('dotenv').config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require('axios');
var moment = require('moment');
moment.suppressDeprecationWarnings = true;
var fs = require('fs');

var term = process.argv[2];
var name = process.argv.slice(3).join(' ');

// Initial run
app(term);

// DO-WHAT-IT-SAYS
function doThing() {
    fs.readFile("random.txt", "utf8", function read(err, data) {
        if (err) {
            throw err;
        }
        term = data.slice(0, data.indexOf(','));
        name = data.slice(data.indexOf('"') + 1, data.lastIndexOf('"'));
        app(term);
    });
}

// Argument Check
function app(str) {
    switch (str) {
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
            doThing();
            break;
    }
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

                "\n---------------------------------------\n"
            );
        }
    ).catch(function (error) {
        if (error.response) {
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        }
        console.log(error.config);
    });

}

// SPOTIFY-THIS-SONG
function spotifySearch() {
    if(name == ''){
        name = "The Sign";
    }

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

            "\n--------------------------------------\n"
        );
    });
}

// MOVIE-THIS
function movieSearch() {
    if(name == ''){
        name = "Mr. Nobody";
    }
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
                "\n---------------------------------------\n"
            );
        }
    ).catch(function (error) {
        if (error.response) {
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        }
        console.log(error.config);
    });

}