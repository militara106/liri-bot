require('dotenv').config();
var keys = require("./keys.js");
var spotify = new spotify(keys.spotify);
var axios = require('axios');

var name = process.argv.slice(2).join(' ');

var bandURL = "https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp";


