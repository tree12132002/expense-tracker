const express = require('express')
const exphbs = require('express-handlebars')
const Expense = require('./models/expense')
const bodyParser = require('body-parser')
const CATEGORY = require('./models/CATEGORY')
const moment = require('moment')
const methodOverride = require('method-override')

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// mongoose
const mongoose = require('mongoose')
const expense = require('./models/expense')
mongoose.connect('mongodb://localhost/Expense', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

// route
app.get('/', (req, res) => {
  Expense.find()
    .lean()
    .then(expenses => {
      let totalAmount = 0
      expenses.forEach((item) => {
        switch (item.category) {
          case '家居物業':
            item['icon'] = CATEGORY.home
            break
          case '交通出行':
            item['icon'] = CATEGORY.transportation
            break
          case '休閒娛樂':
            item['icon'] = CATEGORY.entertainment
            break
          case '餐飲食品':
            item['icon'] = CATEGORY.food
            break
          case '其他':
            item['icon'] = CATEGORY.other
            break
        }
        item.date = moment(item.date).format('YYYY-MM-DD')
        totalAmount += item['amount']
      })
      res.render('index', { expenses, totalAmount })
    })
    .catch(error => console.error(error))
})

// create new record
app.get('/expenses/new', (req, res) => {
  return res.render('new')
})

app.post('/expenses', (req, res) => {
  const { name, date, category, amount } = req.body
  return Expense.create({ name, date, category, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// edit record
app.get('/expenses/:id/edit', (req, res) => {
  const id = req.params.id
  return Expense.findById(id)
    .lean()
    .then((expense) => res.render('edit', { expense }))
    .catch(error => console.error(error))
})

app.put('/expenses/:id', (req, res) => {
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
app.delete('/expenses/:id', (req, res) => {
  const id = req.params.id
  return Expense.findById(id)
    .then(expense => expense.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// choose category
app.get('/expenses/:category', (req, res) => {
  const getCategory = req.query.category
  console.log(getCategory)
  let category = { category: req.query.category }

  if (getCategory === '全部') {
    category = {}
  }
  return Expense.find(category)
    .lean()
    .then(expenses => {
      let totalAmount = 0
      expenses.forEach((item) => {
        switch (item.category) {
          case '家居物業':
            item['icon'] = CATEGORY.home
            break
          case '交通出行':
            item['icon'] = CATEGORY.transportation
            break
          case '休閒娛樂':
            item['icon'] = CATEGORY.entertainment
            break
          case '餐飲食品':
            item['icon'] = CATEGORY.food
            break
          case '其他':
            item['icon'] = CATEGORY.other
            break
        }
        item.date = moment(item.date).format('YYYY-MM-DD')
        totalAmount += item['amount']
      })
      res.render('index', { expenses, category, totalAmount })
    })
    .catch(error => console.error(error))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})