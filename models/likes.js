const mongoose = require('mongoose')
const Schema = mongoose.Schema

const likesSchema = new Schema({name: String})

const Like = mongoose.model('Like', likesSchema)

module.exports = Like
