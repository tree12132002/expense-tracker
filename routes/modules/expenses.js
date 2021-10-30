const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
const Category = require('../../models/category')
const CATEGORY = require('../../config/CATEGORY')

// enter create page
router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => {
      if (categories.length === 0) {
        Category.create({
          name: '家居物業',
          icon: CATEGORY.home
        }, {
          name: '交通出行',
          icon: CATEGORY.transportation
        }, {
          name: '休閒娛樂',
          icon: CATEGORY.entertainment
        }, {
          name: '餐飲食品',
          icon: CATEGORY.food
        }, {
          name: '其他',
          icon: CATEGORY.other
        })
      }
    })
  return res.render('new')
})

// create function
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, category, amount } = req.body
  return Category.find()
    .lean()
    .then(categories => {
      categories.forEach(category => {
        if (category.name === req.body.category) {
          const categoryId = category._id
          Expense.create({ name, date, categoryId, amount, userId })
        }
      })
    })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// enter edit page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Expense.findOne({ _id, userId })
    .lean()
    .then((expense) => res.render('edit', { expense }))
    .catch(error => console.error(error))
})

// edit function
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, category, amount } = req.body
  let categoryId = ''
  Category.find()
    .lean()
    .then(categories => {
      categories.forEach(category => {
        if (category.name === req.body.category) {
          categoryId = category._id
        }
      })
      Expense.findOne({ _id, userId })
        .then(expense => {
          expense.name = name
          expense.date = date
          expense.categoryId = categoryId
          expense.amount = amount
          return expense.save()
        })
    })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// delete function
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Expense.findOne({ _id, userId })
    .then(expense => expense.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router