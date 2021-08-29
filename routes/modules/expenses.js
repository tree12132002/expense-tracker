const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')

// create new record
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const { name, date, category, amount } = req.body
  return Expense.create({ name, date, category, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// edit record
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Expense.findById(id)
    .lean()
    .then((expense) => res.render('edit', { expense }))
    .catch(error => console.error(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, date, category, amount } = req.body
  return Expense.findById(id)
    .then(expense => {
      expense.name = name
      expense.date = date
      expense.category = category
      expense.amount = amount
      return expense.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// delete record
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Expense.findById(id)
    .then(expense => expense.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router