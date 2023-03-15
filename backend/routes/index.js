const express = require('express')
const { Events } = require('../controllers/events')
const router = express.Router()
const { Users } = require('../controllers/users')
const authentication = require('../middlewares/authentication')

router.post('/register', Users.register)
router.post('/login', Users.login)
router.post('/google-login', Users.googleLogin)
router.use(authentication)
router.post('/events', Events.newEvent)
router.get('/events', Events.events)
router.put('/events/:id', Events.updateEvent)
router.delete('/events/:id', Events.deleteEvent)


module.exports = router
