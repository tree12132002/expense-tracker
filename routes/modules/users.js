const express = require('express')
const router = express.Router()

// enter login page
router.get('/login', (req, res) => {
  res.render('login')
})

// login function
router.post('/login', (req, res) => {
  
})

// enter register page
router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router