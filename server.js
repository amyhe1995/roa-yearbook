const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')  // This const var is used for static path
const studentRoute = requrie('./routes')
const fs = require('fs')

const server = express()

// SERVER CONFIGURATION
server.use(express.static.path.join(__dirname, 'public'))
server.use(express.urlencoded({extended: true}))

// HANDLEBARS CONFIGURATION
server.engine('hbs', hbs.engine({extname: 'hbs'}))
server.set('view engine', 'hbs')

// ROUTERS 
server.get('/', (req, res) => {
  
  fs.readFile('./data.json', 'utf-8', (err,data) => {
    if (err) return res.status(500).send(err.message)
    res.render('home', JSON.parse(data))    
  })
})

server.use('/', studentRoute)


module.exports = server

