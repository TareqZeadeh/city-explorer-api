'use strict';
const Movies = require('../constructors/Moviesconstructor');
const axios = require('axios');
require('dotenv').config();

let Memory={};
function MoviesHandler (req, res) {
    const cityname = req.query.searchQuery.toLocaleLowerCase();
    const URL = `${process.env.MOVIE_API_URL}?api_key=${process.env.MOVIE_API_KEY}&query=${cityname}`
    if(Memory[cityname] !== undefined) 
  {
    console.log('get the data from the Memory');
    res.send(Memory[cityname]);
  }
  else{
    axios
        .get(URL)
        .then(result => {
            console.log('get the data from the API');
            res.send(moviesforcastobject(result.data));

        })
        .catch(err => {
            res.send(err);
            console.log(err.data)
        })


}

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
        Memory[cityname]=moviesobjs;
        moviesobjs.push(new Movies(title,overview,average_votes,total_votes,image_url,popularity,released_on))

    })

    return moviesobjs;

};
}


module.exports = MoviesHandler;