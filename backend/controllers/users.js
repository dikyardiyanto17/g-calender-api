const { hashPassword, comparePassword } = require('../helpers/bcryptjs')
const { encodeToken } = require('../helpers/jwt')
const User = require('../schema/User')
const {google} = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
    "590607211046-qkalmrqhj5de79s05sth7pnsoajiklvb.apps.googleusercontent.com",
    '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',
    'http://localhost:3000'
)
oauth2Client.setCredentials({
    refresh_token: '1//04_Nekl5uuHS2CgYIARAAGAQSNwF-L9Ir4YAv_NcTbt2MvY7VCBhlV2ljZyHme-M2Ex2mJEPlxdfOYbFn0PoHRxvzQpIL-ISlFcM'
})

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
            return res.status(201).json({message: 'Success Registering'})
        } catch (error) {
            next(error)
        }
    }

    static async googleLogin(req, res, next) {
        try {
            const { email } = req.body
            const isRegistered = await User.findOne({email})
            if (isRegistered?.email){
                const access_token = encodeToken({id: isRegistered._id.toString()})
                return res.status(201).json({access_token})
            } else {
                const hashedPassword = hashPassword("22222")
                const data = await User.create({
                 email, password: hashedPassword
                })
                return res.status(201).json({message: "Success Registering"})
            }
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
            return res.status(201).json({access_token})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {Users}