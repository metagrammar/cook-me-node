const express = require('express')
const app = express()
const morgan = require('morgan')
const pool = require('./database/index')
const bodyParser = require('body-parser')

const port = process.env.PORT

// MIDDLEWEAR
// Morgan - Write log line on request 'tiny' shows VERB, status code, time in ms
app.use(morgan('tiny'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// ROUTES
// get all recipes on '/'
app.get('/', (req, res) => {
    pool
        .query('SELECT * FROM recpies')
        .then(data => res.json(data.rows))
        .catch(err => console.log(err.message))
})

// get all categories on '/cat'
app.get('/cat', (req, res) => {
    pool
        .query('SELECT * FROM categories')
        .then(data => res.json(data.rows))
        .catch(err => console.log(err.message))
})

// get all main categories on '/cat_main'
app.get('/cat_main', (req, res) => {
    pool
        .query('SELECT * from main_categories')
        .then(data => res.json(data.rows))
        .catch(err => console.log(err.message))
})

app.listen(port, () => console.log('Server is running on: ' + port))