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

  if(req.body.interests.creativity === 'on') {
    req.body.interests.creativity = true
  } else {
    req.body.interests.creativity = false
  }
  if(req.body.interests.lifestyle === 'on') {
    req.body.interests.lifestyle = true
  } else {
    req.body.interests.lifestyle = false
  }
  if(req.body.interests.nature === 'on') {
    req.body.interests.nature = true
  } else {
    req.body.interests.nature = false
  }
  if(req.body.interests.adventure === 'on') {
    req.body.interests.adventure = true
  } else {
    req.body.interests.adventure = false
  }
  if(req.body.interests.travel === 'on') {
    req.body.interests.travel = true
  } else {
    req.body.interests.travel = false
  }


  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    console.log('user is created')
    res.redirect('/products/')
  })
})

module.exports = users
