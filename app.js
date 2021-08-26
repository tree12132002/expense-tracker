const express = require('express')
const app = express()

// mongoose
const mongoose = require('mongoose')
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
  res.send('Hello')
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})