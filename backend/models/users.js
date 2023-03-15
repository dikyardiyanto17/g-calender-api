const { ObjectId } = require('mongodb')
const { getDB } = require('../config/mongodb')

class User {
    static model(){
        return getDB().collection('users')
    }

    static async create(data){
        return await this.model().insertOne(data)
    }

    static async update(id, data){
        return await this.model().updateOne({_id: ObjectId(id)}, data)
    }

    static async delete(id){
        return await this.model().deleteOne({_id: ObjectId(id)})
    }

    static async findAll(){
        return await this.model().find().toArray()
    }

    static async findById(id){
        return await this.model().findOne({_id: ObjectId(id)})
    }
}

module.exports = {User}