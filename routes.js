const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/students/:id', (req,res) => {
  const id = req.params.id
})