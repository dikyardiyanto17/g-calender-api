const Event = require('../schema/Event')

class Events {
    static async newEvent(req, res, next) {
        try {
            const { NamaKegiatan, Tanggal, JamMulai, JamSelesai } = req.body
            if (!NamaKegiatan){
                throw {name: 'Bad Request', message: 'Event Name is empty'}
            }
            if (!Tanggal){
                throw {name: 'Bad Request', message: 'Event Date is empty'}
            }
            if (!JamMulai){
                throw {name: 'Bad Request', message: 'Event Starting at is empty'}
            }
            if (!JamMulai){
                throw {name: 'Bad Request', message: 'Event Ending at is empty'}
            }
            const data = await Event.create({
             NamaKegiatan, Tanggal, JamMulai, JamSelesai
            })
            return res.json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {Events}