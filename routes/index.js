const express = require('express')
const user = require('../models/user')
const router = express.Router()
const User = require('../models/user')

//Render
router.get('/', (req, res)=>{
    res.render('index')
})
//Getting all
router.get('/', async(req, res)=>{
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message})
        
    }
})
//Getting one
router.get('/:id',  getUser, (req, res)=>{
    res.json(res.user)
})

//Creating One
router.post('/', async(req, res)=>{
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password
    })
    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    }catch(err){
        res.status(400).json({ message: err.message})
    }
})


//Updating One
router.patch('/:id', getUser, async (req, res)=>{
    if(req.body.firstname != null){
        res.user.firstname = req.body.firstname
    }
    if(req.body.lastname != null){
        res.user.lastname = req.body.lastname
    }
    if(req.body.username != null){
        res.user.username = req.body.username
    }
    if(req.body.password != null){
        res.user.password = req.body.password
    }
    try {
        const updtatedUser = await res.user.save()
        res.json(updtatedUser)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Deleting One
router.delete('/:id', getUser, async (req, res)=>{
    try {
        await res.user.remove()
        res.json({ message: 'User Deleted'})
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})

async function getUser(req, res, next){
    let user
    try {
        user =  await User.findById(req.params.id)
        if(user==null ){
            return res.status(404).json({message: 'Cannot find user'})
        }
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }

    res.user = user
    next()

}

module.exports = router
