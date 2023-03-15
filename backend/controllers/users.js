const { hashPassword, comparePassword } = require('../helpers/bcryptjs')
const { encodeToken } = require('../helpers/jwt')
const { User } = require('../scheme/User')
const { ObjectId } = require('mongodb')

class Users {
    static async register(req, res, next) {
        try {
            const { username, email, password } = req.body
            if (!username){
                throw {name: 'Bad Request', message: 'Username is empty'}
            }
            if (!email){
                throw {name: 'Bad Request', message: 'Email is empty'}
            }
            if (!password){
                throw {name: 'Bad Request', message: 'Password is empty'}
            }
            const hashedPassword = hashPassword(password)
            const user = {
                username, email, hashedPassword
            }
            const data = await User.create(user)
            return res.json(data)
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const {email, password} = req.body
            if (!email){
                throw {name: 'Bad Request', message: 'Email is empty'}
            }
            if (!password){
                throw {name: 'Bad Request', message: 'Password is empty'}
            }
            const data = await User.findByEmail(email)
            if (!data?.email){
                throw {name: 'Invalid email or password', message: 'Invalid email or password'}
            }
            const isValid = comparePassword(password, data.hashedPassword)
            if (!isValid){
                throw {name: 'Invalid email or password', message: 'Invalid email or password'}
            }
            console.log(ObjectId(data._id), "<<<<<<<<<<")
            const encodedUsers = encodeToken(ObjectId(data._id).toString())
            return res.json({email: data.email, username: data.username, encodedUsers})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {Users}