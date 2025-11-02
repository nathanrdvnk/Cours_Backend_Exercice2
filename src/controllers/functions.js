const express = require('express')
const router = express.Router()
const Infos = require('../models/todomodel')

//DisplayAll
router.get('/', async(req, res) => {
    try {
        const tasks = await Infos.find()
        res.json(tasks)
    } catch (err) {
        res.status(500).json ({ message : err.message })
    }
})

//DisplayOne
router.get('/:id', gettask, (req, res) => {
    res.json(res.tasks)

})

//AddOne
router.post('/', async(req, res) => {
    const tasks = new Infos({
        name: req.body.name
    })
    try {
        const newInfos = await tasks.save()
        res.status(201).json(newInfos)
    } catch (err) {
        res.status(400).json({ message : err.message })
    }
})

//RemoveOne
router.delete('/:id', gettask, async(req, res) => {
    try {
        await res.tasks.deleteOne()
        res.json({ message : 'Task deleted' })
    } catch (err) {
        res.status(500).json({ message : err.message })
    }
})

//Middleware
async function gettask(req, res, next) {
    let tasks
    try {
        tasks = await Infos.findById(req.params.id)
        if (tasks == null) {
            return res.status(404).json({ message : 'Cannot find task' })
        }
    } catch (err) {
        return res.status(500).json({ message : err.message })
    }
    res.tasks = tasks
    next()
}

module.exports = router