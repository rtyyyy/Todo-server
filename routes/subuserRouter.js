const Router = require('express')
const router = new Router()
const subuserController = require('../controllers/subuserController')

router.get('/', subuserController.getAll)

module.exports = router