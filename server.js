const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')  // This const var is used for static path
const studentRoute = require('./routes.js')
const fs = require('fs')

const server = express()

// SERVER CONFIGURATION
server.use(express.static(path.join(__dirname, 'public')))
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

server.get('/students', (req, res) => {
  
  fs.readFile('./data.json', 'utf-8', (err,data) => {
    if (err) return res.status(500).send(err.message)
    res.render('home', JSON.parse(data))    
  })
})


// server.get("/students/add", (req,res)=> {
//   fs.readFile('./data.json', 'utf-8', (err,data) => {
//     if (err) return res.status(500).send(err.message)
//     res.render('add', JSON.parse(data))    
//   })  
// })

// server.post("/students/add", (req,res)=>{
//   const body = req.body

//   fs.readFile("./data.json","utf-8", (err,data)=> {
//     if (err) return  res.status(500).send(err.message)
//     const parsedData = JSON.parse(data)
//     const studentsArr = parsedData.students
//     const idFrom = studentsArr.length
//     const obj = {
//       id: idFrom + 1,
//       name: body.name,
//       favouriteAnimal: body.favouriteAnimal,
//       blog : body.blog
//     }

//     studentsArr.push(obj)
//     const stringfyData = JSON.stringify(parsedData)    
    
//     fs.writeFile('./data.json', stringfyData, (err)=>{
//       if (err) return res.status(500).send(err.message)
//       res.redirect("/")
//     })
//   })  
// })

server.use('/', studentRoute)

module.exports = server

