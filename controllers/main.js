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
  console.log(req.session.currentUser)
    User.find({username: req.session.currentUser}, (err, foundUser)=>{
      console.log(foundUser)
        Post.create(req.body, (err, createdPost)=>{
          console.log(createdPost)
            // foundUser.posts.push(createdPost)
            // foundUser.save((err, data)=>{
                res.redirect('/main')
            // })
        })
    })
})
