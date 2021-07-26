const express = require('express')
const router = express.Router()

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}

module.exports = router

router.get('/', (req, res) => {
  res.render(
    'main/index.ejs',
    {currentUser: req.session.currentUser,
    tabTitle:'Home'}
  )
})
