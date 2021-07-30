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

router.get('/new', (req, res)=>{
    User.find({}, (err, allUsers)=>{
        res.render('main/new.ejs', {
            users: allUsers,
            tabTitle: 'New Post',
            currentUser: req.session.currentUser
        })
    })
})

router.get('/userposts', (req, res)=>{
  User.findOne({username: req.session.currentUser.username}, (err, foundUser)=>{
    res.render(
      'main/userposts.ejs',
      {posts:foundUser.posts,
      tabTitle: 'Your Posts',
      currentUser: req.session.currentUser
    })
  })
})

router.get('/:id/edit', (req, res) => {
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

router.get('/:id', (req, res) => {
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

router.post('/', (req, res)=>{
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

router.post('/:id/comment', (req, res)=>{
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

router.put('/:id', (req, res)=>{
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

router.delete('/:id', (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err, foundPost)=>{
    User.findOne({'posts._id':req.params.id}, (error, foundUser)=>{
      foundUser.posts.id(req.params.id).remove()
      foundUser.save((error, data)=>{
        res.redirect('/main')
      })
    })
  })
})

router.post('/:id/like/:user', (req, res) => {
  Post.findOne({_id: req.params.id}, (err, foundPost)=>{
      foundPost.likes.push({name:req.params.user})
      foundPost.save((err, data)=>{
          res.redirect('/main/'+req.params.id)
      })
  })
})

router.delete('/:id/dislike/:currentUser', (req, res) => {
  Post.findOne({_id: req.params.id}, (err, foundPost)=>{
    console.log(foundPost)
    console.log(foundPost.likes)
    console.log(foundPost.likes.name)
      foundPost.likes.name(req.params.currentUser).remove()
      foundPost.save((error, data)=>{
        res.redirect('/main/'+req.params.id)
      })
  })
})
