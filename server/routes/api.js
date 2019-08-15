const express = require('express')

const router = express.Router()
const User = require('../models/user')
const Book = require('../models/book')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const db = 'mongodb+srv://usergrei:pswgrei@eventsdb-azlcq.mongodb.net/test?retryWrites=true'

router.get('/', (req, res) => {
    res.send('From API route')
})

mongoose.connect(db, err => {
    if (err) {
        console.error('Error!' + err)
    } else {
        console.log('Connected to mongodb')
    }
})

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error)
        } else {
            res.status(200).send("User registered")
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error);
        } else
            if (!user) {
                res.status(401).send('Invalid email')
            } else {
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid password')
                }
                else {

                    let payload = { subject: user._id, role: user.role };
                    let token = jwt.sign(payload, 'secretKey');
                    res.status(200).send({token})
                }

            }
    }
    )
})

//to add a new book to the database
router.post('/manage', verifyToken, (req, res) => {
    let bookData = req.body
    let book = new Book(bookData)
    book.save((error, registeredBook) => {
        if (error) {
            console.log(error)
        } else {
            res.status(200).send(registeredBook)
        }
    })
})

//to edit book present in the database
router.put('/books', verifyToken, (req, res) => {

    if (!req.query._id) {
        return res.status(400).send('Missing URL parameter: _id')
    }

    let bookData = req.body
    let book = new Book(bookData)

    let query = {
        $set: {
            title: book.title, authors: book.authors,
            description: book.description, genres: book.genres,
            price: book.price, hide: book.hide, book: bookData.hideBook
        }
    }


    Book.findOneAndUpdate({ _id: req.query._id }, query, { new: true })
        .then(updatedBook => {
            res.json(updatedBook)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

//to delete a book in the database
router.delete('/books',verifyToken, (req, res) => {

    if (!req.query._id) {
        return res.status(400).send('Missing URL parameter: _id')
    }

    let bookData = req.body
    let book = new Book(bookData)

    console.error("ID of updated book is: " + book._id)

    Book.findOneAndRemove({ _id: req.query._id })
        .then(removedBook => {
            res.json(removedBook)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})



function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unathorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unathorized request')
    }

    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unathorized request')
    }

    req.userId = payload.subject
    next()

}
router.get('/book', (req, res) => {

    if (!req.query._id) {
        return res.status(400).send('No book ID provided')
    }
    console.error("Id eshte : "+req.query._id)
    Book.findOne({ _id: req.query._id }, (error, book) => {
        if (error) {
            return res.status(400).send(err)
        } else
            if (!book) {

                res.status(401).send('No books with this ID')
            } else {
                res.json(book)
            }
    })
})

router.get('/books', (req, res) => {


    Book.find({}, (error, books) => {
        if (error) {
            console.log(error);
        } else
            if (!books) {
                res.status(401).send('Empty StoreBook')
            } else {
                res.json(books)
            }
    })
    //res.json(books)


})


router.get('/cart', (req, res) => {

    if (!req.query._id) {
        return res.status(400).send('Usern not logged-in')
    }

    User.findOne({ _id: req.query._id }, (error, user) => {
        if (error) {
            return res.status(400).send('Error Server:' + error)
        } else
            if (!user) {
                res.status(401).send('No user with this id')
            } else {
                res.json(user)
            }
    })


    //res.json(books)


})

router.put('/cart', (req, res) => {

    if (!req.query._id) {
        return res.status(400).send('Missing URL parameter: _id')
    }

    User.findOne({ _id: req.query._id }, (error, user) => {
        if (error) {
            return res.status(400).send('Error Server:' + error)
        } else
            if (!user) {
                res.status(401).send('No user with thi id')
            } else {
                
                let booksCart = req.body.booksCart

                let query = {
                    $set: {
                        books: booksCart
                    }
                }

                User.findOneAndUpdate({ _id: req.query._id }, query, { new: true })
                    .then(updatedBookCart => {
                        res.json(req.body)
                    })
                    .catch(err => {
                        res.status(500).json(err)
                    })




            }
    })


})

router.put('/buy', (req, res) => {

    if (!req.query._id) {
        return res.status(400).send('Missing URL parameter: _id')
    }

    User.findOne({ _id: req.query._id }, (error, user) => {
        if (error) {
            return res.status(400).send('Error Server:' + error)
        } else
            if (!user) {
                res.status(401).send('No user with thi id')
            } else {
                
                
                console.error("Bought books: "+req.body)
                let query = {
                    $set: {
                        myBook: req.body
                    }
                }

                User.findOneAndUpdate({ _id: req.query._id }, query, { new: true })
                    .then(updatedBookCart => {
                        res.json(updatedBookCart)
                    })
                    .catch(err => {
                        res.status(500).json(err)
                    })




            }
    })


})

router.get('/mybook', (req, res) => {

    if (!req.query._id) {
        return res.status(400).send('Usern not logged-in')
    }

    User.findOne({ _id: req.query._id }, (error, user) => {
        if (error) {
            return res.status(400).send('Error Server:' + error)
        } else
            if (!user) {
                res.status(401).send('No user with thi id')
            } else {
                res.send(user.myBook)
            }
    })




})

module.exports = router