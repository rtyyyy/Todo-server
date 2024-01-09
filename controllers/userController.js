const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, TodoList, Subordinates, SubordinatesUser} = require('../models/models')

const generateJwt = (id, email, role, name, surname, patronymic) => {
    return jwt.sign(
        {id, email, role, name, surname, patronymic}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role, name, surname, patronymic} = req.body
        if(!email || !password) {
            return next(ApiError.badRequest('Некорректный логин или пароль'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({email, role, password: hashPassword, name, surname, patronymic})
        const subordinates = await Subordinates.create({userId: user.id})
        const taskList = await TodoList.create({userId: user.id})
        const token = generateJwt(user.id, email, role, name, surname, patronymic)
        return res.json({token})
    }

    async login(req, res, next) {
        const {password, email} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь с таким email не существует'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role, user.name, user.surname, user.patronymic)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.name, req.user.surname, req.user.patronymic)
        res.json({token})
    }

    async getOne(req, res, next) {
        const {id} = req.params
        const user = await User.findOne({where: {id}})
        return res.json(user)
    }
}

module.exports = new UserController()