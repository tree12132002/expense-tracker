const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
const Category = require('../../models/category')
const moment = require('moment')


router.get('/', (req, res) => {
  const userId = req.user._id

  Expense.find({ userId })
    .lean()
    .sort({ date: 'desc', _id: 'desc' })
    .then(expenses => {
      let totalAmount = 0
      expenses.forEach((expense) => {
        Category.find()
          .lean()
          .then(categories => {
            categories.forEach((category) => {
              if (String(expense.categoryId) === String(category._id)) {
                expense.icon = category.icon
              }
            })
          })
        expense.date = moment(expense.date).format('YYYY-MM-DD')
        totalAmount += expense['amount']
      })
      res.render('index', { expenses, totalAmount })
    })
    .catch(error => console.error(error))
})

module.exports = router