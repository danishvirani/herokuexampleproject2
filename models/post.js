const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Comment = require('./comments.js')

const postSchema = new Schema(
  {
    title: {
      type: String, required: true
    },
    picture: {
      type: String, default: 'https://i.imgur.com/4WwApRO.jpg'
    },
    description: {
      type: String
    },
    author: {
      type: String
    },
    creativity: {type: Boolean},
    lifestyle: {type: Boolean},
    nature: {type: Boolean},
    adventure: {type: Boolean},
    travel: {type: Boolean},
    comments: [Comment.schema],
    date: { type: Date, default: Date.now },
    likes: {type: Number},
  }
)

const Post = mongoose.model('Post', postSchema)

module.exports = Post
