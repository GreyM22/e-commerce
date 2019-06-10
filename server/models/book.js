const mongoose = require('mongoose')

const Schema = mongoose.Schema


const bookSchema = new Schema({
    title : String,
    authors : { type : Array , "default" : [] } ,
    description : String,
    genres : { type : Array , "default" : [] },
    price : Number,
    hide : Boolean,
    hideBook : Boolean,
    urlImg: String
})

module.exports = mongoose.model('book', bookSchema, 'books')