const express = require('express')
const app = express()
const morgan = require('morgan')
const bcrypt = require('bcrypt')

const productRouter = require('./api/routes/products')
const userRouter = require('./api/routes/users')

//Middleware
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())


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

app.get('/', (req, res)=>{
    res.render('login.ejs')
})

app.get('/register', (req, res)=>{
    res.render('register.ejs')
})

app.get('/dashboard', (req, res)=>{
    res.render('dashboard.ejs')
})

app.post('/users/login', async (req, res)=>{
    const user = users.find(
        user=> user.name === req.body.name)
        if(user == null){
            return res.status(400).send('Cannot find user')
        }
        try{
            if(await bcrypt.compare(req.body.password, user.password)){
                res.send('Success')
            }else{
                res.send('Not Allowed')
            }
        }catch{
            res.status(500).send()
        }
})

app.post('/register', (req, res)=>{

})

module.exports = app