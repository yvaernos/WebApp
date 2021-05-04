const express = require('express')
const app = express()

const productRouter = require('./api/routes/products')


//Middleware
app.use(express.json())

app.use((req, res, next) =>{
    res.status(200).json({
        message: 'all good'
    })
})

//CORS errors handling
app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requiested-With, Content-Type", 
    "Accept, Authorization"
    ) 
    if(req.method=== 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 
        'PUT,POST,PATCH,DELETE,GET')
        return res.status(200).json({})
    }
    next()
})

//handle requests
app.use('/products', productRouter)

app.use((req, res, next) =>{
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) =>{
    error.status(error.status || 500)
    res.json({
        error:{
            message: error.message
        }
    })
})

//setting home page views
app.set('view engine', 'ejs')

app.get('/dashboard', (req, res)=>{
    res.render('dashboard.ejs', { name: 'Leo'})
})

module.exports = app