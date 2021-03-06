const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Post = require('./post.js')
const { isStrongPassword } = require('validator')

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Please Enter a Username']
    },
    password: {
      type: String,
      required: [true, 'Please Enter a Password'],
      validate: [isStrongPassword, 'Please Enter a Strong Password (Mininum 8 Characters - Atleast 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character (!@#$%&*)']
    },
    profilePicture: {
      type: String, default: 'https://i.imgur.com/pIYMngN.png'
    },

      creativity: {type: Boolean},
      lifestyle: {type: Boolean},
      nature: {type: Boolean},
      adventure: {type: Boolean},
      travel: {type: Boolean},

      posts: [Post.schema]

  }
)

const User = mongoose.model('User', userSchema)

module.exports = User
