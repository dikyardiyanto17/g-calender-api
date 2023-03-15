const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    NamaKegiatan: {
        type: String,
        required: true
    },
    Tanggal: {
        type: Date,
        required: true
    },
    JamMulai: {
        type: Date,
        required: true
    },
    JamSelesai: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Event', eventSchema)