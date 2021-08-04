'use strict';
const Forcast = require('../constructors/Weatherconstructor') ;

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




module.exports = wetherforcastobject;