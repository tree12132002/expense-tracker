const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
const Category = require('../../models/category')
const moment = require('moment')

// choose category
router.get('/', (req, res) => {
  const userId = req.user._id
  let category = req.query.category
  console.log(category)
  if (category === '全部') {
    return res.redirect('/')
  }
  Expense.find({ userId })
    .lean()
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
      res.render('index', { expenses, totalAmount, category })
    })
    .catch(error => console.error(error))
})

module.exports = router