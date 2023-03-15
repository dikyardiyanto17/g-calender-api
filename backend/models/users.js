const { ObjectId } = require('mongodb')
const { db } = require('../config/mongodb')

class User {
    static model(){
        return db().collection('users')
    }

    static async create(data){
        return await this.model().insertOne(data)
    }

    static async findById(id){
        return await this.model().findOne({_id: ObjectId(id)})
    }

    static async findByEmail(email){
        return await this.model().findOne({email})
    }
}

module.exports = {User}