const express = require('express')
const router = express.Router()
const Post = require('../models/post.js')
const User = require('../models/users.js')
const Comment = require('../models/comments.js')
const Like = require('../models/likes.js')

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

router.get('/new', isAuthenticated, (req, res)=>{
    User.find({}, (err, allUsers)=>{
        res.render('main/new.ejs', {
            users: allUsers,
            tabTitle: 'New Post',
            currentUser: req.session.currentUser
        })
    })
})

router.get('/userposts', isAuthenticated, (req, res)=>{
  Post.find({author: req.session.currentUser.username}, (err, foundPosts)=>{
    res.render(
      'main/index.ejs',
      {posts:foundPosts,
      tabTitle: 'Your Posts',
      currentUser: req.session.currentUser
    })
  })
})

router.get('/curated', isAuthenticated, (req, res)=>{
  Post.find({}, (error, allPosts) => {
    res.render(
      'main/index.ejs',
      {posts:allPosts,
      tabTitle: 'Suggested Posts',
      currentUser: req.session.currentUser
    })
  })
})

router.get('/filter/:search', isAuthenticated, (req, res)=>{
  if (req.params.search = 'creativity'){
    Post.find({ "creativity": true }, (error, foundPosts) => {
      res.render(
        'main/index.ejs',
        {posts:foundPosts,
        tabTitle: req.params.search+' Posts',
        currentUser: req.session.currentUser
      })
    })
  } else if (req.params.search = 'lifestyle'){
    Post.find({ "lifestyle": true }, (error, foundPosts) => {
      res.render(
        'main/index.ejs',
        {posts:foundPosts,
        tabTitle: req.params.search+' Posts',
        currentUser: req.session.currentUser
      })
    })
  } else if (req.params.search = 'nature'){
    Post.find({ "nature": true }, (error, foundPosts) => {
      res.render(
        'main/index.ejs',
        {posts:foundPosts,
        tabTitle: req.params.search+' Posts',
        currentUser: req.session.currentUser
      })
    })
  } else if (req.params.search = 'adventure'){
    Post.find({ "adventure": true }, (error, foundPosts) => {
      res.render(
        'main/index.ejs',
        {posts:foundPosts,
        tabTitle: req.params.search+' Posts',
        currentUser: req.session.currentUser
      })
    })
  } else if (req.params.search = 'travel'){
    Post.find({ "travel": true }, (error, foundPosts) => {
      res.render(
        'main/index.ejs',
        {posts:foundPosts,
        tabTitle: req.params.search+' Posts',
        currentUser: req.session.currentUser
      })
    })
  }
})

router.get('/:id/edit', isAuthenticated, (req, res) => {
  Post.findById(req.params.id, (error, foundPost) => {
    console.log(foundPost)
    res.render(
      'main/edit.ejs',
      {post:foundPost,
      tabTitle:'Edit Post',
      currentUser: req.session.currentUser}
    )
  })
})

router.get('/:id', isAuthenticated, (req, res) => {
  Post.findById(req.params.id, (error, foundPost) => {
    res.render(
      'main/show.ejs',
      {post:foundPost,
      tabTitle:'View Post',
      currentUser: req.session.currentUser,
      comments:foundPost.comments}
    )
  })
})

router.post('/', isAuthenticated, (req, res)=>{
    User.find({username: req.session.currentUser.username}, (err, foundUser)=>{

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
            foundUser[0].posts.push(createdPost)
            foundUser[0].save((err, data)=>{
                res.redirect('/main')
            })
        })
    })
})

router.post('/:id/comment', isAuthenticated, (req, res)=>{
    User.findOne({'posts._id' : req.params.id}, (err, foundUser)=>{
        Post.findOne({_id: req.params.id}, (err, foundPost)=>{
          Comment.create(req.body, (err, createdComment)=>{
            foundPost.comments.push(createdComment)
            foundPost.save((err, data)=>{
                res.redirect('/main/'+req.params.id)
            })
          })
        })
    })
})

router.put('/:id', isAuthenticated, (req, res)=>{
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
    Post.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedPost)=>{
        User.findOne({ 'posts._id' : req.params.id }, (err, foundUser)=>{
            foundUser.posts.id(req.params.id).remove()
            foundUser.posts.push(updatedPost)
            foundUser.save((err, data)=>{
                res.redirect('/main/')
            })
        })
    })
})

router.delete('/:id', isAuthenticated, (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err, foundPost)=>{
    User.findOne({'posts._id':req.params.id}, (error, foundUser)=>{
      foundUser.posts.id(req.params.id).remove()
      foundUser.save((error, data)=>{
        res.redirect('/main')
      })
    })
  })
})

router.post('/:id/like/:user', isAuthenticated, (req, res) => {
  Post.findOne({_id: req.params.id}, (err, foundPost)=>{
      foundPost.likes.push({name:req.params.user})
      foundPost.save((err, data)=>{
          res.redirect('/main/'+req.params.id)
      })
  })
})

router.delete('/:id/dislike/:user', isAuthenticated, (req, res) => {
  Post.update({ _id: req.params.id }, { '$pull': { 'likes': { 'name': req.params.user } }}, { safe: true, multi:true }, (err, obj) => {
      res.redirect('/main/'+req.params.id)
    })
})
