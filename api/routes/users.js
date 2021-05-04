const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')

//Render
router.get('/', (req, res)=>{
    res.render('user')
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
router.post('/signup', async(req, res)=>{
    try{
        const newUser = await user.save()
        User.find({ email: req.body.email})
        .exec().then(user=>{
            if(user.length>=1){
                return res.status(409).json({
                    message: 'Email alredy exists'
                })
            }else{
                const hashedPassword = bcrypt.hash(
                    req.body.password, 10)
                const user = {
                    email: req.body.email,
                    password: hashedPassword
                }
                users.push(user)
                res.status(201).json(newUser, {
                    message: "User created"
                })
            }
        })
    }catch(err){
        res.status(500).json({ message: err.message})
    }
})

//Updating One
router.patch('/:id', getUser, async (req, res)=>{
    if(req.body.firstName != null){
        res.user.firstName = req.body.firstName
    }
    if(req.body.lastName != null){
        res.user.lastName = req.body.lastName
    }
    if(req.body.email != null){
        res.user.email = req.body.email
    }
    if(req.body.password != null){
        res.user.password = req.body.password
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