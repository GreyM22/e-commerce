const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name : String,
    surname : String,
    email : String,
    birthDate : Date,
    books : { type : Array , "default" : [] },
    password : String,
    role : String
})

module.exports = mongoose.model('user', userSchema, 'users')