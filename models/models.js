const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    password: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},
    patronymic: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'PRIVATE'}
})

const Subordinates = sequelize.define('subordinates', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes. INTEGER, allowNull: false}
})

const SubordinatesUser = sequelize.define('subordinates_user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER}
})

const TodoList = sequelize.define('todoList', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER, allowNull: false}
})

const TodoListTask = sequelize.define('todoList_task', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    task_id: { type: DataTypes.INTEGER, allowNull: false},
    todoList_id: {type: DataTypes.INTEGER, allowNull: false}
})

const Task = sequelize.define('task', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING},
    dateEnd: {type: DataTypes.DATE, allowNull: false},
    userCreate: {type: DataTypes.STRING, allowNull: false},
    userResponsible: {type: DataTypes.STRING, allowNull: false}
})

const Status = sequelize.define('status', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Priority = sequelize.define('priority', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

User.hasOne(Subordinates)
Subordinates.belongsTo(User)

Subordinates.hasMany(SubordinatesUser)
SubordinatesUser.belongsTo(Subordinates)

SubordinatesUser.hasOne(TodoList)
TodoList.belongsTo(Subordinates)

TodoList.hasMany(TodoListTask)
TodoListTask.belongsTo(TodoList)

TodoListTask.hasOne(Task)
Task.belongsTo(TodoListTask)

Status.hasMany(Task)
Task.belongsTo(Status)

Priority.hasMany(Task)
Task.belongsTo(Priority)

module.exports = {
    User, TodoList, TodoListTask, Task, Status, Priority, Subordinates, SubordinatesUser
}