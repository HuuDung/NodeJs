const express = require('express')
const Task = require('../models/task')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

//GET /tasks?completed=true
//GET /tasks?limit=10&skip=0
//GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    //Filter
    const match = {
        completed: req.query.completed || [true, false]
    }
    //Paginate
    const options = {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip)
    }
    //Sort
    const parts = req.query.sortBy.split(':')
    const sort = {}
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    options.sort = sort
    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options
        }).execPopulate()
        const tasks = req.user.tasks

        res.send(tasks)
    } catch (e) {
        res.status(500).send()

    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(500).send()

    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({
            error: "Invalid updates"
        })
    }

    const _id = req.params.id

    try {
        const task = await Task.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true
        })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findByIdAndDelete(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router