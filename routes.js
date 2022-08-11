const express = require('express')
const router = express.Router()
const fs = require('fs')
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

router.post('/students/:id/edit', (req,res) => {
  const id = req.params.id
  const body = req.body

  fs.readFile('./data.json', 'utf-8', (err,data) => {
    if (err) return res.status(500).send(err.message)

    const parsedData = JSON.parse(data)
    
        
    parsedData.students.forEach(s => {
      if (s.id == id) {
        s.name = body.name
        s.favouriteAnimal = body.favouriteAnimal
        s.blog = body.blog
      }    
    })


    const studentsArr = JSON.stringify(parsedData)
    console.log(studentsArr)

      fs.writeFile('./data.json', studentsArr, 'utf-8', (err) => {
        if (err) throw err
      console.log('written succesfully')
      res.redirect('/students/' + id)
    })
  })
})




module.exports = router