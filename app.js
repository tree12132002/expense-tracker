const express = require('express')
const exphbs = require('express-handlebars')
const Expense = require('./models/expense')
const bodyParser = require('body-parser')
const CATEGORY = require('./models/CATEGORY')
const moment = require('moment')
const methodOverride = require('method-override')
const routes = require('./routes')

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

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





app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})