const express = require('express')
const mongoose = require('mongoose')
//const bodyParser = require('body-parser')
const cors = require('cors')
const url = "mongodb://localhost:27017/BooksDB"

const app = express()

mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
const con = mongoose.connection


app.use(express.json())
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

const BooksDB = require('./mongoDB')

app.get('/', async (req, res) => {
    try {
        const AllBooks = await BooksDB.find()
        res.render('index', { Books: AllBooks })
    } catch (error) {
        console.log("Error : " + error)
    }
})

app.get('/add', async (req, res) => {
    try {
        res.render('addBook')
    } catch (error) {
        console.log("Error : " + error)
    }
})

app.post('/add', async (req, res) => {
    try {
        const b = await BooksDB.create(req.body)
        res.redirect('/')
    } catch (error) {
        console.log("Error : " + error)
    }
})

app.get('/:id', async (req, res) => {
    try {
        const Book = await BooksDB.findById(req.params.id)
        res.render('oneBook', { Book: Book })
    } catch (error) {
        console.log("Error : " + error)
    }
})

app.get('/update/:id', async (req, res) => {
    try {
        const Book = await BooksDB.findById(req.params.id)
        res.render('updateBook', { id: req.params.id, Book: Book})
    } catch (error) {
        console.log("Error : " + error)
    }
})

app.post('/update/:id', async (req, res) => {
    try {
        const Books = await BooksDB.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/')
    } catch (error) {
        console.log("Error : " + error)
    }
})

app.get('/delete/:id', async (req, res) => {
    try {
        const Books = await BooksDB.findByIdAndRemove(req.params.id)
        console.log(Books)
        res.redirect('/')
    } catch (error) {
        console.log("Error : " + error)
    }
})

app.listen(8082, () => {
    console.log("Started!!!")
})