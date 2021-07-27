const express = require('express')
const seed = express.Router()
const Post = require('../models/post.js')

// SEED ROUTE
seed.get('/setup', (req, res) => {
  Post.create(
    [
      {
        title: 'Taipei Skyline',
        picture: 'https://images.unsplash.com/photo-1627297449780-8d7ce7331f82?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        description: 'Took this picture from a local rooftop. Taipei lies in the relatively narrow bowl-shaped valley of the Tan-shui and two of its main tributaries, the Chi-lung (Jilong) and Hsin-tien (Xindian) rivers. The generally low-lying terrain of the central areas on the western side of the municipality slopes upward to the south and east and especially to the north.',
        author: 'Placeholder',
        creativity: false,
        lifestyle: true,
        nature: false,
        adventure: true,
        travel: true
      },
      {
        title: 'Pink Lotus Flower in Pond',
        picture: 'https://images.unsplash.com/photo-1627301189280-a994f2b52b4e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        description: 'Found a secluded pond in Beijing and was able to catch this amazing picture of a pond lily',
        author: 'Placeholder',
        creativity: true,
        lifestyle: false,
        nature: true,
        adventure: true,
        travel: false
      }
    ],
    (error, data) => {
      res.redirect('/main')
    }
  )
})
