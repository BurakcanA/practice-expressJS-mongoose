const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Product = require('./models/product')
var methodOverride = require('method-override')

app.set('views', path.join(__dirname,'views'))
app.set('view-engine','ejs')

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))

const categories = ['vegetable','fruit','dairy']

mongoose.connect('mongodb://127.0.0.1:27017/farmDb')
    .then(() => {
        console.log('Connected to Database shopDb')
    })
    .catch((err) => {
        console.log(`Connection Failed Error: ${err}`)
    })

app.listen('3000',() => {
    console.log('App is listening from port 3000')
})

app.get('/products', async (req, res) => {
    const products = await Product.find({})
    res.render('./products/index.ejs', { products })
}) 

app.get('/products/create', (req,res) => {
    res.render('./products/create.ejs', { categories })
})

app.post('/products/', async (req, res) => {
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.redirect(`/Products/${newProduct._id}`)
})

app.get('/products/:id', async (req, res) => {
    const {id} = req.params
    const product = await Product.findById(id)
    res.render('./products/show.ejs' , { product })
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    res.render('./products/edit.ejs', { product, categories })
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params
    await Product.findByIdAndUpdate(id,req.body,{runValidators: true, new: true})
    .then((data) => console.log(data))
    res.redirect('/products/' + id)
})

app.get('/',(req,res) => {
    res.send('WELCOME!')
})