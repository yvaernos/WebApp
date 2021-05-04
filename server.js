if(process.env.NODE_ENV !=='production'){
    require('dotenv').config()
}
const app = require('./app')
const mongoose = require('mongoose')

//Database connection
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

//listen to incomming
app.listen(process.env.PORT || 3000,
    () => console.log('Server Started'))  