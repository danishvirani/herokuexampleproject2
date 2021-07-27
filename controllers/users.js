const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js')

//handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code)
}

users.get('/new', (req, res) => {
  res.render(
    'users/new.ejs',
    {tabTitle: 'Create New User',
    currentUser: req.session.currentUser}
  )
})

users.post('/', (req, res) => {
  console.log(req.body)

  if(req.body.creativity === 'on') {
    req.body.creativity = true
  } else {
    req.body.creativity = false
  }
  if(req.body.lifestyle === 'on') {
    req.body.lifestyle = true
  } else {
    req.body.lifestyle = false
  }
  if(req.body.nature === 'on') {
    req.body.nature = true
  } else {
    req.body.nature = false
  }
  if(req.body.adventure === 'on') {
    req.body.adventure = true
  } else {
    req.body.adventure = false
  }
  if(req.body.travel === 'on') {
    req.body.travel = true
  } else {
    req.body.travel = false
  }


  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    console.log('user is created')
    res.redirect('/main')
  })
})

module.exports = users
