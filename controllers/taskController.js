const {Task, User} = require('../models/models')
const ApiError = require('../error/ApiError')

class TaskController {
    async create(req, res, next) {
        try {
            const {title, description, statusId, priorityId, dateEnd, userCreate, userResponsible} = req.body
            const task = await Task.create({title, description, statusId, priorityId, dateEnd, userCreate, userResponsible})
            
            return res.json(task)
        } catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }   

    async getAll(req, res, next) {
        const userResponsible = req.params.id
        const userCreate = req.params.id
        console.log(userCreate, userResponsible)
        if (!userCreate && !userResponsible) {
            next(ApiError.badRequest('Не задан ID'))
        }
        const tasks = []
        tasks.push(await Task.findAll({where: 
            {userCreate}
        }))
        
        tasks.push(await Task.findAll({where: 
            {userResponsible}
        }))
        
        return res.json(tasks.flat());
    }

    async getOne(req, res, next) {
        const {id} = req.params
        if (!id) {
            next(ApiError.badRequest('Не задан ID'))
        }
        const task = await Task.findOne({where: {id}})
        return res.json(task)
    }

    async delete(req, res, next) {
        const userCreate = req.params.id
        if (!id) {
            next(ApiError.badRequest('Не задан ID'))
        }
        const task = await Task.destroy({where: {userCreate}})
        return res.json(task)
    }

    async updateStatus(req, res, next) {
        const {id, statusId} = req.body
        console.log(id, statusId)
        if (!id || !statusId) {
            next(ApiError.badRequest('Не указаны ID заявки или ID статуса'))
        }
        const task = await Task.findOne({where: {id}})
        task.update({statusId: statusId})
        return res.json(task)
    }
}

module.exports = new TaskController()