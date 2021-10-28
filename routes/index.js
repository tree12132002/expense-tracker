const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const expenses = require('./modules/expenses')
const category = require('./modules/category')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')

router.use('/expenses', authenticator, expenses)
router.use('/category', authenticator, category)
router.use('/users', users)
router.use('/', authenticator, home)

module.exports = router