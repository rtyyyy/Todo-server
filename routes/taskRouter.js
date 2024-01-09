const Router = require('express')
const router = new Router()
const taskController = require('../controllers/taskController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('CAPTAIN'), taskController.create)
router.get('/:id', taskController.getAll)
router.delete('/:id', taskController.delete)
router.put('/', taskController.updateStatus)
router.get('/single/:id', taskController.getOne)

module.exports = router