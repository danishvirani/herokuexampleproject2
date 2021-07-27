const express = require('express')
const router = express.Router()
const Post = require('../models/post.js')
const User = require('../models/users.js')

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}

module.exports = router

router.get('/', (req, res) => {
  Post.find({}, (error, allPosts) => {
      res.render(
        'main/index.ejs',
        {posts:allPosts,
        tabTitle:'Home',
        currentUser: req.session.currentUser}
      )
  })
})

router.get('/new', (req, res)=>{
    User.find({}, (err, allUsers)=>{
        res.render('main/new.ejs', {
            users: allUsers,
            tabTitle: 'New Post',
            currentUser: req.session.currentUser
        })
    })
})

router.post('/', (req, res)=>{
  console.log(req.session.currentUser.username)
    User.find({username: req.session.currentUser.username}, (err, foundUser)=>{
      console.log(foundUser)
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
        Post.create(req.body, (err, createdPost)=>{
          console.log(createdPost)
          console.log(foundUser[0])
            foundUser[0].posts.push(createdPost)
            foundUser[0].save((err, data)=>{
                res.redirect('/main')
            })
        })
    })
})
