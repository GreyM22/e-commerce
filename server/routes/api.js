const express = require('express')

const router = express.Router()
const User = require('../models/user')
const Books = require('../models/book')
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
            res.status(200)
        }
    })
})

router.post('/login', (req,res) =>{
    let userData = req.body

    User.findOne({username: userData.username}, (error, user)=>{
        if(error){
            console.log(error);
        } else 
        if(!user){
            res.status(401).send('Invalid username')
        } else {
            if( user.password!==userData.password)
            {
                res.status(401).send('Invalid password')
            }
            else {
                let payload = { subject : User._id}
            let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({token})
            }
        }
    })
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

router.get('/books', (req,res)=>{
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
          {
            "_id": "3",
            "name": "Belonging: A German Reckons with History and Home",
            "description": "* Winner of the National Book Critics Circle Award * Silver Medal Society of Illustrators *Named a Best Book of the Year by The New York Times, The Boston Globe, San Francisco Chronicle, NPR, Comics Beat, The Milwaukee Journal-Sentinel, Kirkus Reviews, and Library Journal*This “ingenious reckoning with the past” (The New York Times), by award-winning artist Nora Krug investigates the hidden truths of her family’s wartime history in Nazi Germany.",
            "price": "17.99",
            "hide" : "true"
          },
          {
            "_id": "4",
            "name": "The Overstory: A Novel",
            "description": "The Overstory, winner of the 2019 Pulitzer Prize in Fiction, is a sweeping, impassioned work of activism and resistance that is also a stunning evocation of―and paean to―the natural world. From the roots to the crown and back to the seeds, Richard Powers’s twelfth novel unfolds in concentric rings of interlocking fables that range from antebellum New York to the late twentieth-century Timber Wars of the Pacific Northwest and beyond. There is a world alongside ours―vast, slow, interconnected, resourceful, magnificently inventive, and almost invisible to us. This is the story of a handful of people who learn how to see that world and who are drawn up into its unfolding catastrophe.",
            "price": "12.59",
            "hide" : "true"
          },
          {
            "_id": "5",
            "name": "Fairview",
            "description": "lorem Dazzling and ruthless…One of the most exquisitely and systematically arranged ambushes of an unsuspecting audience in years…A glorious, scary reminder of the unmatched power of live theater to rattle, roil and shake us wide awake.” —Ben Brantley, New York Times. Grandma’s birthday approaches. Beverly is organizing the perfect dinner, but everything seems doomed from the start: the silverware is all wrong, the radio is on the fritz, and the rest of the family can’t be bothered to help. What at first appears to be a comedic family comedy takes a sharp, sly turn into a startling examination of deep-seated paradigms about race in America.",
            "price": "10.37",
            "hide" : "true"
          },
          {
            "_id": "6",
            "name": "Frederick Douglass: Prophet of Freedom",
            "description": "As a young man Frederick Douglass (1818–1895) escaped from slavery in Baltimore, Maryland. He was fortunate to have been taught to read by his slave owner mistress, and he would go on to become one of the major literary figures of his time. His very existence gave the lie to slave owners: with dignity and great intelligence he bore witness to the brutality of slavery.            ",
            "price": "17.99",
            "hide" : "true"
          }
    ]
    /*
    Books.find({hideBook: false}, (error, books)=>{
        if(error){
            console.log(error);
        } else 
        if(books.empty()){
            res.status(401).send('Empty StoreBook')
        } else {
            res.json(books)
            }
        }
    )*/

    
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