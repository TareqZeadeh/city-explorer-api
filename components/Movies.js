'use strict';
const Movies = require('../constructors/Moviesconstructor');

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



module.exports = moviesforcastobject;