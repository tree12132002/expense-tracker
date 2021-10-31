const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const expenseLists = require('../seeds/expense.json').results
const Expense = require('../expense')
const User = require('../user')
const Category = require('../category')
const db = require('../../config/mongoose')

const SEED_USER = [
  {
    name: 'root',
    email: 'root@example.com',
    password: '12345678'
  }
]

db.once('open', () => {
  Promise.all(
    Array.from(SEED_USER, async (seedUser) => {
      try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(seedUser.password, salt)
        const user = await User.create({
          name: seedUser.name,
          email: seedUser.email,
          password: hash
        })
        const userId = user._id
        for (const expenseList of expenseLists) {
          const category = await Category.findOne({ name: expenseList.category }).lean()
          const categoryId = category._id
          await Expense.create({
            name: expenseList.name,
            date: expenseList.date,
            amount: expenseList.amount,
            userId: userId,
            categoryId: categoryId
          })
        }
      } catch (err) {
        console.log(err)
      }
    }))
    .then(() => {
      console.log('done!')
      process.exit()
    })
    .catch(err => console.log(err))
})
