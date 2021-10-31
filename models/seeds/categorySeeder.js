if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Category = require('../category')
const categoryList = require('../seeds/category.json').results

db.once('open', () => {
  console.log('mongodb connected!')
  Category.create(categoryList)
    .then(() => {
      console.log('done.')
      process.exit()
    })
})
