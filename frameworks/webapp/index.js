const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
const axios = require('axios');

const app = express();
const port = 3000;

process.on('SIGINT', function() {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});

app.set("view engine", "ejs");

const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});


app.get('/', (req, res) => {
    // res.send('Hello World!');
    const data = {name: 'Leah'};
    res.render('index', data);
});

app.get('/user', (req, res) => {
    teammembers = []
    pool
        .query('SELECT * FROM teammembers;')
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
                teammembers.push(query_res.rows[i]);
            }
            const data = {teammembers: teammembers};
            // console.log(teammembers);
            res.render('user', data);
        });


});

app.get('/pokemon', (req, res) => {
    axios.get('https://pokeapi.co/api/v2/pokemon/charizard')
    .then(response => {
        if(response.status == 200) {
            // console.log(response);
            const data = {'pokemon':response.data};
            res.render('pokemon', data);
        }
        else {
            alert("Error!");
        }
        
    });

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
