const mongoose = require('mongoose')
const Schema = mongoose.Schema
const expenseSchema = new Schema({
  id: {
    type: Number
  },
  name: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    require: true
  },
  amount: {
    type: Number,
    require: true
  },
  category: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('Expense', expenseSchema)