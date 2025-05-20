const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')

app.set('views', path.join(__dirname,'views'))
app.set('view-engine','ejs')

mongoose.connect('mongodb://127.0.0.1:27017/farmDb')
    .then(() => {
        console.log('Connected to Database shopDb')
    })
    .catch((err) => {
        console.log(`Error Catched: ${err}`)
    })

app.listen('3000',() => {
    console.log('App is listening from port 3000')
})

app.get('/',(req,res) => {
    res.send('WELCOME!')
})