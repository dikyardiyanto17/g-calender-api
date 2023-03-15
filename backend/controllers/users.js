const { hashPassword, comparePassword } = require('../helpers/bcryptjs')
const { encodeToken } = require('../helpers/jwt')
const User = require('../schema/User')

class Users {
    static async register(req, res, next) {
        try {
            const { email, password } = req.body
            const duplicate = await User.findOne({email})
            if (duplicate?.email){
                throw {name: 'Already Taken', message: 'Email Already Taken'}
            }
            if (!email){
                throw {name: 'Bad Request', message: 'Email is empty'}
            }
            if (!password){
                throw {name: 'Bad Request', message: 'Password is empty'}
            }
            const hashedPassword = hashPassword(password)
            const data = await User.create({
             email, password: hashedPassword
            })
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
            const data = await User.findOne({email})
            if (!data?.email){
                throw {name: 'Invalid email or password', message: 'Invalid email or password'}
            }
            const isValid = comparePassword(password, data.password)
            if (!isValid){
                throw {name: 'Invalid email or password', message: 'Invalid email or password'}
            }
            const access_token = encodeToken({id: data._id.toString()})
            return res.json({access_token})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {Users}