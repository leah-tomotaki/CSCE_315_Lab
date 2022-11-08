const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
const axios = require('axios');
const cors = require("cors");
const path = require("path");

const app = express();
const port = 5000;

process.on('SIGINT', function() {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});

// Prevent CORS error
app.use(cors());

const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});


app.get('/', (req, res) => {
    // Replace Student with your name!
    const data = {name: 'Student'};
    
    // send data as json instead of rendering view
    res.json(data);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.use(express.static(path.join(process.cwd(),"../client","build")));

app.get('*', (req, res) => {
    return res.sendFile(path.join(process.cwd(),"../client", "build","index.html"));
})

app.use(express.static(
    path.join(__dirname,"../client/build")));
