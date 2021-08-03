'use strict';

const express = require('express');
const server = express();
const cors = require('cors');
require('dotenv').config();

const weatherdata = require('./data/weather.json');
server.use(cors());
const axios = require('axios');
const PORT = process.env.PORT;

// // http://localhost:3001/ (/ === root route)
// server.get('/',(req,res) => {
//     res.send('Hi From the root route');
// })

// // http://localhost:3001/test (/test === route)
// server.get('/test',(request,response) => {
//     let str = 'Hello From the server side';
//     response.send(str);})

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
            res.send(wetherforcastobject(result.data));



        })
        .catch(err => {
            res.send(err);
        })
    console.log('outside promise');

    //     const weatherresult = weatherdata.find(element => {
    //         if (((lat === element.lat) && (lon === element.lon)) && (cityname === element.city_name.toLocaleLowerCase() )) {
    //             return true;
    //         }
    //         else {

    //             return '';
    //         }
    //     })

    //     if (weatherresult) {
    //         res.send(wetherforcastobject(weatherresult))
    //     }
    //     else {
    //         res.status(404).send('city not found');
    //     }

})

const wetherforcastobject = (weatherobj) => {
    const forcastobj = [];

    weatherobj.data.map(element => {
        const description = `Low of ${element.low_temp} ,high of ${element.max_temp} with ${element.weather.description} `;
        const date = element.datetime;

        forcastobj.push(new Forcast(description, date));
        console.log(forcastobj);
    });


    return forcastobj;

};



class Forcast {

    constructor(description, date) {


        this.date = date;
        this.description = description;

    }

}

//http://localhost:3001/movies?searchQuery=Amman

//https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
server.get('/movies', (req, res) => {
    const cityname = req.query.searchQuery.toLocaleLowerCase();
    const URL = `${process.env.MOVIE_API_URL}?api_key=${process.env.MOVIE_API_KEY}&query=${cityname}`
    axios
        .get(URL)
        .then(result => {
            console.log('inside promise');
            res.send(moviesforcastobject(result.data));

        })
        .catch(err => {
            res.send(err);
            console.log(err.data)
        })


})

const moviesforcastobject = (moviesobj) => {
    const moviesobjs = [];

    moviesobj.results.map(obj => {
        
        const title=obj.title;
        const overview=obj.overview;
        const average_votes=obj.vote_average;
        const total_votes=obj.vote_count;
        const image_url= process.env.IMG_URL+obj.poster_path;
        const popularity=obj.popularity;
        const released_on=obj.release_date;

        moviesobjs.push(new Movies(title,overview,average_votes,total_votes,image_url,popularity,released_on))



    })

    return moviesobjs;


};

class Movies {

    constructor(title, overview, average_votes, total_votes, image_url, popularity, released_on) {

        this.title = title;
        this.overview = overview;
        this.average_votes = average_votes;
        this.total_votes = total_votes;
        this.image_url =image_url;
        this.popularity = popularity;
        this.released_on = released_on;

    }

}






server.listen(PORT, () => {
    console.log(`listening To PORT = ${PORT}`);
})
