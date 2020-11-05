const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/users', async (req, res) => {

    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({
            user: user.getPublicProfile(),
            token
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({
            user: user.getPublicProfile(),
            token
        })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
        await req.user.save()

        res.status(200).send("Logout successfull")
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.status(200).send("Logout successfull")
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send({
            user: user.getPublicProfile()
        })
    } catch (error) {
        res.status(500).send()
    }
})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({
            error: "Invalid updates"
        })
    }

    const _id = req.params.id

    try {
        // const user = await User.findById(_id)

        // updates.forEach((update) => user[update] = req.body[update])

        // await user.save()
        const user = await User.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true
        })
        if (!user) {
            return res.status(404).send()
        }
        res.send({
            user: user.getPublicProfile()
        })
    } catch (e) {
        console.log(e);
        res.status(400).send(e)
    }
})

router.delete('/users/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        await user.remove()
        if (!user) {
            return res.status(404).send()
        }
        res.send({
            user: user.getPublicProfile()
        })
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router