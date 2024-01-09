const { Priority } = require('../models/models')
const ApiError = require('../error/ApiError')

class PriorityController {
    async create(req, res) {
        const {name} = req.body
        const priority = await Priority.create({name})
        return res.json(priority)
    }

    async getAll(req, res) {
        const prioritys = await Priority.findAll()
        return res.json(prioritys)
    }

    async getOne(req, res) {
        const {id} = req.params
        const priority = await Priority.findOne({where: {id}})
        return res.json(priority.name)
    }
}

module.exports = new PriorityController()