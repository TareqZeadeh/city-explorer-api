'use strict';

const express = require('express');
const server = express();
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');
server.use(cors());
const PORT = process.env.PORT;
const weatherdata = require('./data/weather.json');
const WeatherHandler = require('./components/Weather');
const MoviesHandler = require('./components/Movies')

//=========================================WeatherPart====================================================
// http://localhost:3001/weather?lat=31.95&lon=35.91&searchQuery=Amman
server.get('/weather', (req, res) => {
    const lat = Number(req.query.lat);
    const lon = Number(req.query.lon);
    const cityname = req.query.searchQuery.toLocaleLowerCase();
    const URL = `${process.env.Weather_API_URL}?city=${cityname}&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`

     axios
        .get(URL)
        .then(result => {
            console.log('inside promise');
            res.send(WeatherHandler(result.data));

        })
        .catch(err => {
            res.send(err);
        })
    console.log('outside promise');

})

//=========================================MoviesPart===========================================================

//http://localhost:3001/movies?searchQuery=Amman
//https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false

server.get('/movies', (req, res) => {
    const cityname = req.query.searchQuery.toLocaleLowerCase();
    const URL = `${process.env.MOVIE_API_URL}?api_key=${process.env.MOVIE_API_KEY}&query=${cityname}`
    axios
        .get(URL)
        .then(result => {
            console.log('inside promise');
            res.send(MoviesHandler(result.data));

        })
        .catch(err => {
            res.send(err);
            console.log(err.data)
        })


})

server.listen(PORT, () => {
    console.log(`listening To PORT = ${PORT}`);
})
