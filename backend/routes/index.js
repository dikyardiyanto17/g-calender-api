const express = require('express')
const router = express.Router()
const { Users } = require('../controllers/users')
const authentication = require('../middlewares/authentication')

router.post('/users', Users.register)
router.get('/users', Users.findUsers)
router.get('/users/:authorId', Users.findUser)
router.post('/login')
router.use(authentication)

module.exports = router
