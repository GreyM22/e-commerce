const express = require('express')

const router = express.Router()
const User = require('../models/user')
const Book = require('../models/book')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const db = 'mongodb+srv://usergrei:pswgrei@eventsdb-azlcq.mongodb.net/test?retryWrites=true'

router.get('/', (req,res)=>{
    res.send('From API route')
})

mongoose.connect(db, err => {
    if(err){
        console.error('Error!'+err)
    } else{
        console.log('Connected to mongodb')
    }
})
 
router.post('/register', (req,res)=>{
    let userData = req.body
    console.error(userData)
    let user = new User(userData)
    user.save((error, registeredUser)=>{
        if(error){
            console.log(error)
        }else {
            let payload = { subject : registeredUser._id}
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
        }
    })
})

router.post('/manage', (req,res)=>{
    let bookData = req.body
    let book = new Book(bookData)
    book.save((error, registeredBook)=>{
        if(error){
            console.log(error)
        }else {
            res.status(200).send(registeredBook)
        }
    })
})

router.put('/books', (req,res)=>{
    
    if(!req.query._id){
        return res.status(400).send('Missing URL parameter: _id')
    }
    
    let bookData = req.body
    let book = new Book(bookData)

    let query = {    $set: {
                           title: book.title, authors: book.authors, 
                           description: book.description,genres: book.genres, 
                           price : book.price, hide: book.hide, book: bookData.hideBook 
                        }
    }
    

    console.error("ID of updated book is: "+book._id)
    Book.findOneAndUpdate({_id : req.query._id}, query, { new: true})
        .then( updatedBook =>{
            res.json(updatedBook)
        })
        .catch(err =>{
            res.status(500).json(err)
        })
} )


router.delete('/books', (req,res)=>{
    
    if(!req.query._id){
        return res.status(400).send('Missing URL parameter: _id')
    }
    
    let bookData = req.body
    let book = new Book(bookData)    

    console.error("ID of updated book is: "+book._id)

    Book.findOneAndRemove({_id : req.query._id})
        .then( removedBook =>{
            res.json(removedBook)
        })
        .catch(err =>{
            res.status(500).json(err)
        })
} )
 

router.post('/login', (req,res) =>{
    let userData = req.body

    User.findOne({email: userData.email}, (error, user)=>{
        if(error){
            console.log(error);
        } else 
        if(!user){
            res.status(401).send('Invalid email')
        } else {
            if( user.password!==userData.password)
            {
                res.status(401).send('Invalid password')
            }
            else {
                
                let payload = { subject : user._id, role: user.role};
                let token = jwt.sign(payload, 'secretKey');
                res.status(200).send({token})
            }
                
            }
        }
    )
})

function verifyToken( req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('Unathorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token==='null'){
        return res.status(401).send('Unathorized request')
    }

    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
        return res.status(401).send('Unathorized request')
    }

    req.userId = payload.subject
    next()

} 
router.get('/books/:id', (req,res)=>{

    console.error("Objekti i Requestit eshte " +req)

    let id = req
    console.error("Fillon kontrolli per librin me ID: "+id)
    Book.find({ _id: id}, (error, books)=>{
        if(error){
            console.log(error);
        } else 
        if(!books){
            
            res.status(401).send('Empty StoreBook')
        } else {
            console.error("Te dhenat e librit u derguan ne req")
            res.json(books)
            }
        })
})

router.get('/books', (req,res)=>{
    
   
    Book.find({}, (error, books)=>{
        if(error){
            console.log(error);
        } else 
        if(!books){
            res.status(401).send('Empty StoreBook')
        } else {
            res.json(books)
            }
        })
        //res.json(books)

    
})


router.get('/specialbooks', verifyToken, (req,res)=>{
    let books = [
        {
            "_id": "1",
            "name": "Milkman: A Novel",
            "description": "In an unnamed city, middle sister stands out for the wrong reasons. She reads while walking, for one. And she has been taking French night classes downtown. So when a local paramilitary known as the milkman begins pursuing her, she suddenly becomes “interesting,” the last thing she ever wanted to be. Despite middle sister’s attempts to avoid him―and to keep her mother from finding out about her maybe-boyfriend―rumors spread and the threat of violence lingers. Milkman is a story of the way inaction can have enormous repercussions, in a time when the wrong flag, wrong religion, or even a sunset can be subversive. Told with ferocious energy and sly, wicked humor, Milkman establishes Anna Burns as one of the most consequential voices of our day.",
            "price": "11.66",
            "hide" : "true"
          },
          {
            "_id": "2",
            "name": "Directorate S: The C.I.A. and America's Secret Wars in Afghanistan and Pakistan",
            "description": "From the Pulitzer Prize-winning author of Ghost Wars, the epic and enthralling story of America's intelligence, military, and diplomatic efforts to defeat Al Qaeda and the Taliban in Afghanistan and Pakistan since 9/11",
            "price": "21.98",
            "hide" : "true"
          },
          
    ]

    res.json(books)
})

module.exports = router