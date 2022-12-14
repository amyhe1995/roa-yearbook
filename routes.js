const express = require('express')
const router = express.Router()
const fs = require('fs')
const fetchGif = require('./utils')


router.get("/students/add", (req,res)=> {
  fs.readFile('./data.json', 'utf-8', (err,data) => {
    if (err) return res.status(500).send(err.message)   
    res.render('add', JSON.parse(data))    
  })  
})

router.post("/students/add", (req,res)=>{
  const body = req.body

  fs.readFile("./data.json","utf-8", async (err,data)=> {
    if (err) return  res.status(500).send(err.message)
    const parsedData = JSON.parse(data)
    const studentsArr = parsedData.students
    const idFrom = studentsArr.length
    const gifURL = await fetchGif(body.favouriteAnimal)
    const obj = {
      id: idFrom + 1,
      name: body.name,
      favouriteAnimal: body.favouriteAnimal,
      blog : body.blog,
      image: gifURL
    }

    studentsArr.push(obj)
    const stringfyData = JSON.stringify(parsedData)    
    
    fs.writeFile('./data.json', stringfyData, (err)=>{
      if (err) return res.status(500).send(err.message)
      res.redirect("/")
    })
  })  
})

router.get('/students/:id', (req,res) => {
  const id = req.params.id

  fs.readFile('./data.json', 'utf-8', (err,data) => {
    if (err) return res.status(500).send(err.message)

    const parsedData = JSON.parse(data)
    const student = parsedData.students.find(s => s.id ==id)

    res.render('details',student)
  })
})

router.get('/students/:id/edit', (req,res) => {
  const id = req.params.id

  fs.readFile('./data.json','utf-8', (err,data) => {
    if (err) return res.status(500).send(err.message)

    const parsedData = JSON.parse(data)
    const student = parsedData.students.find(s => s.id ==id)

    res.render('edit', student)
  })
})

router.post('/students/:id/edit', async (req,res) => {
  const id = req.params.id
  const body = req.body

  fs.readFile('./data.json', 'utf-8', async (err,data) => {
    if (err) return res.status(500).send(err.message)

    const parsedData = JSON.parse(data)

    const student = parsedData.students.find(s => s.id == id)

    student.name = body.name
    student.favouriteAnimal = body.favouriteAnimal
    student.blog = body.blog
    student.image = await fetchGif(body.favouriteAnimal)

    const studentsArr = JSON.stringify(parsedData)

    fs.writeFile('./data.json', studentsArr, 'utf-8', (err) => {
      if (err) throw err
      console.log('written succesfully')
      res.redirect('/students/' + id)
    })
  })
})



module.exports = router