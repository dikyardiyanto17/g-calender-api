const { MongoClient } = require("mongodb");

const uri = process.env.MONGOURI || "mongodb+srv://dikyardiyanto:102117014@challenge2phase3.cl2pgfn.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

let db

async function connect() {
    try {
        await client.connect()
        console.log('mongoDB connencted')
        db = client.db('challenge2phase3')
    } catch (error) {
        await client.close();
    }
}

function getDB() {
    return db
}

module.exports = { connect, getDB }