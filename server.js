'use strict';

const express = require('express');
const server = express();
const cors = require('cors');
require('dotenv').config();

const weatherdata = require('./data/weather.json');
server.use(cors());

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


    const weatherresult = weatherdata.find(element => {
        if (((lat === element.lat) && (lon === element.lon)) && (cityname === element.city_name.toLocaleLowerCase() )) {
            return true;
        }
        else {

            return '';
        }
    })

    if (weatherresult) {
        res.send(wetherforcastobject(weatherresult))
    }
    else {
        res.status(404).send('city not found');
    }

})

const wetherforcastobject = (weatherobj) => {
    const forcastobj = [];

    weatherobj.data.map(element => {
       const description = `Low of ${element.low_temp} ,high of ${element.max_temp} with ${element.weather.description} `;
       const date = element.datetime;

        forcastobj.push(new Forcast(description,date));
console.log(forcastobj);
    });


return forcastobj; 

};



class Forcast {

    constructor(description,date) {

        
        this.date = date;
        this.description = description;

    }

}








server.listen(PORT, () => {
    console.log(`listening To PORT = ${PORT}`);
})
