const express = require('express')
const app = express()
const morgan = require('morgan')
const pool = require('./database/index')
const bodyParser = require('body-parser')
var cors = require('cors')

const port = process.env.PORT

// MIDDLEWEAR
// Morgan - Write log line on request 'tiny' shows VERB, status code, time in ms
app.use(morgan('tiny'))

// Cors middlewear
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// ROUTES
// get all recipes on '/'
app.get('/', (req, res) => {
    pool
        .query('SELECT * FROM recipes')
        .then(data => res.json(data.rows))
        .catch(err => console.log(err.message))
})

// get filter results on '/filter/filter&filter&filter'
app.get('/filter/', (req, res) => {
    const { filter } = req.body
    console.log(filter)
})

// get all recipes on '/step/:id'
app.get('/step/:id', (req, res) => {
    let { id } = req.params
     pool
         .query(`SELECT * FROM step WHERE recipe_id=${id}`)
         .then(data => res.json(data.rows))
         .catch(err => console.log(err.message))
 })

// get recipe on '/recipe/:recipe_slug'
app.get('/recipe/:recipe_slug', (req, res) => {
   let { recipe_slug } = req.params
    pool
        .query(`SELECT * FROM recipes WHERE recipe_slug='${recipe_slug}'`)
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
        .query('SELECT * FROM main_categories')
        .then(data => res.json(data.rows))
        .catch(err => console.log(err.message))
})

// get search results on '/search/searchquery'
app.get('/search/:searchquery', (req, res) => {
    const { searchquery } = req.params
    pool
        .query(`SELECT * 
            FROM recipes 
            WHERE LOWER(recipe_title) 
            LIKE LOWER('%${searchquery}%')
            OR LOWER(recipe_description) 
            LIKE LOWER('%${searchquery}%')`)
        .then(data => res.json(data.rows))
        .catch(err => console.log(err.message))
})

app.listen(port, () => console.log('Server is running on: ' + port))