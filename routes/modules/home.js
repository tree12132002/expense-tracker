const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
const CATEGORY = require('../../models/CATEGORY')
const moment = require('moment')

router.get('/', (req, res) => {
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


module.exports = router