const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
const moment = require('moment')

// choose category
router.get('/', (req, res) => {
  const userId = req.user._id
  const category = req.query.category
  if (category === '全部') {
    return res.redirect('/')
  }
  Expense.find({ userId })
    .populate('categoryId')
    .lean()
    .sort({ date: 'desc', _id: 'desc' })
    .then(searchexpense => {
      const expenses = searchexpense.filter(expense => expense.categoryId.name === category)
      let totalAmount = 0
      expenses.forEach(expense => {
        expense.date = moment(expense.date).format('YYYY-MM-DD')
        expense.icon = expense.categoryId.icon
        totalAmount += expense.amount
      })
      res.render('index', { expenses, totalAmount, category })
    })
    .catch(error => console.error(error))
})

module.exports = router
