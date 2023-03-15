const { hashPassword } = require('../helpers/bcryptjs')
const { User } = require('../models/users')

class Users {
    static async register(req, res) {
        const { username, email, password } = req.body
        const hashedPassword = hashPassword(password)
        const user = {
            username, email, hashedPassword
        }
        const data = await User.create(user)
        return res.json(data)
    }

    static async findUser(req, res) {
        const {authorId} = req.params
        const data = await User.findById(authorId)
        return res.json(data)
    }

    static async findUsers(req, res) {
        const data = await User.findAll()
        return res.json(data)
    }

    static async login(req, res) {
        const {authorId} = req.params
        const data = await User.findById(authorId)
        return res.json(data)
    }
}

module.exports = {Users}