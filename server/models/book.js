const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookSchema = new Schema({
    title : String,
    author : String,
    description : String,
    category : String,
    price : Number,
    hide : Boolean,
    hideBook : Boolean
})

module.exports = mongoose.model('book', bookSchema, 'books')