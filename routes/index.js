const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const taskRouter = require('./taskRouter')
const statusRouter = require('./statusRouter')
const priorityRouter = require('./priopityRouter')
const subuserRouter = require('./subuserRouter')

router.use('/user', userRouter)
router.use('/status', statusRouter)
router.use('/priority', priorityRouter)
router.use('/task', taskRouter)
router.use('/subuser', subuserRouter)

module.exports = router