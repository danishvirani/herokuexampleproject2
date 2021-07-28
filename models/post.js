const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema(
  {
    title: {
      type: String, required: true
    },
    picture: {
      type: String
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
    comments: [{body: String, date: Date}],
    date: { type: Date, default: Date.now },
    likes: {type: Number},
    timestamps: true
  }
)

const Post = mongoose.model('Post', postSchema)

module.exports = Post
