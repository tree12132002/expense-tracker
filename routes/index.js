const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const expenses = require('./modules/expenses')
const category = require('./modules/category')
const users = require('./modules/users')

router.use('/', home)
router.use('/expenses', expenses)
router.use('/category', category)
router.use('/users', users)

module.exports = router