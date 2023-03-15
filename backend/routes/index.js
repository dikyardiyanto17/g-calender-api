const express = require('express')
const router = express.Router()
const { Users } = require('../controllers/users')
const authentication = require('../middlewares/authentication')

router.post('/register', Users.register)
router.post('/login', Users.login)
router.use(authentication)

module.exports = router
