const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

sessions.get('/new', (req, res) => {
  res.render(
    'sessions/new.ejs',
    {tabTitle: 'Log In',
    currentUser: req.session.currentUser}
  )
})

sessions.get('/new/:error', (req, res) => {
  res.render(
    'sessions/error.ejs',
    {error: req.params.error,
    currentUser: req.session.currentUser}
  )
})

// on sessions form submit (log in)
sessions.post('/', (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    console.log(foundUser)
    if (err) {
      console.log(err)
      message = 'Sorry we encountered a problem, try again later'
      // res.redirect('/new/Sorry&we&encountered&a&problem&try%again&later')
      res.send('Sorry we encountered a problem, try again later')
    } else if (!foundUser) {
      message = 'Username not found'
      // res.redirect('/new/Username&not&found')
      res.send('Username not found')
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser
        res.redirect('/main/')
      } else {
        message = 'The Password does not match our records'
        // res.redirect('/new/The&Password&does&not&match&our&records')
        res.send('The Password does not match our records')
      }
    }
  })
})


sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

module.exports = sessions
