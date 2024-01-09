const {SubordinatesUser, User} = require('../models/models')
const ApiError = require('../error/ApiError')

class subuserController {  

    async getAll(req, res, next) {
        const {subordinateId} = req.query
        console.log(req.query)
        let subuser
        const array = []
        const users = []
        if (!subordinateId) { 
            next(ApiError.badRequest('Не введен ID пользователя'))
            return;
        }
        if (subordinateId) {
            subuser = await SubordinatesUser.findAll({where: {subordinateId}})
                .then(data => data.map(el => array.push(el.userId)))
            for (let i = 0; i < array.length; i++) {
                let id = array[i]
                users.push(await User.findAll({where: {id}}))
            }
        }

        return res.json(users.flat())
    }
}

module.exports = new subuserController()