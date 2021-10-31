const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
const moment = require('moment')


router.get('/', (req, res) => {
  const userId = req.user._id
  Expense.find({ userId })
    .populate('categoryId')
    .lean()
    .sort({ date: 'desc', _id: 'desc' })
    .then(expenses => {
      let totalAmount = 0
      expenses.forEach(expense => {
        expense.date = moment(expense.date).format('YYYY-MM-DD')
        expense.icon = expense.categoryId.icon
        totalAmount += expense.amount
      })
      res.render('index', { expenses, totalAmount })
    })
    .catch(error => console.error(error))
})

module.exports = router