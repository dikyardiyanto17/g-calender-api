const request = require('supertest');
const app = require('../app');
const fs = require('fs');

let token
let deleted
beforeAll(async () => {
});

afterAll(async () => {
})

describe("All Test", () => {
    describe("Users", () => {
        it("Should create users", () => {
            return request(app)
            .post("/register")
            .send({
                email: '2222@gmail.com',
                password: '22222'
            })
            .then((response) => {
                expect(response.status).toBe(201)
                expect(response.body).toHaveProperty('message', 'Success Registering')
            })
        })  
        
        it("Shouldnot create users", () => {
            return request(app)
            .post("/register")
            .send({
                password: '22222'
            })
            .then((response) => {
                expect(response.status).toBe(400)
                expect(response.body).toHaveProperty('message', expect.any(String))
            })
        }) 

        it("Shouldnot create users", () => {
            return request(app)
            .post("/register")
            .send({
                email: '22222@gmail.com'
            })
            .then((response) => {
                expect(response.status).toBe(400)
                expect(response.body).toHaveProperty('message', expect.any(String))
            })
        }) 

        it("Shouldnot create users", () => {
            return request(app)
            .post("/register")
            .send({
                email: "dicapricornus17@gmail.com",
                password: '22222'
            })
            .then((response) => {
                expect(response.status).toBe(409)
                expect(response.body).toHaveProperty('message', expect.any(String))
            })
        }) 

        it("Should login", () => {
            return request(app)
            .post("/google-login")
            .send({
                email: "22@gmail.com",
            })
            .then((response) => {
                expect(response.status).toBe(201)
                expect(response.body).toHaveProperty('access_token', expect.any(String))
            })
        })

        it("Should create new user", () => {
            return request(app)
            .post("/google-login")
            .send({
                email: "222@gmail.com",
            })
            .then((response) => {
                expect(response.status).toBe(201)
                expect(response.body).toHaveProperty('access_token', expect.any(String))
            })
        })

        it("Should login", () => {
            return request(app)
            .post("/login")
            .send({
                email: "dicapricornus17@gmail.com",
                password: '22222'
            })
            .then((response) => {
                token = response.body.access_token
                expect(response.status).toBe(201)
                expect(response.body).toHaveProperty('access_token', expect.any(String))
            })
        })

        it("Shouldnot login", () => {
            return request(app)
            .post("/login")
            .send({
                password: '22222'
            })
            .then((response) => {
                expect(response.status).toBe(400)
                expect(response.body).toHaveProperty('message', expect.any(String))
            })
        })

        it("Shouldnot login", () => {
            return request(app)
            .post("/login")
            .send({
                email: 'dicapricornus17@gmail.com'
            })
            .then((response) => {
                expect(response.status).toBe(400)
                expect(response.body).toHaveProperty('message', expect.any(String))
            })
        })

        it("Shouldnot login", () => {
            return request(app)
            .post("/login")
            .send({
                email: 'dicapricornus17@gmail.com',
                password: '2222'
            })
            .then((response) => {
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty('message', expect.any(String))
            })
        })

        it("Shouldnot login", () => {
            return request(app)
            .post("/login")
            .send({
                email: 'dicapricor@gmail.com',
                password: '22222'
            })
            .then((response) => {
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty('message', expect.any(String))
            })
        })
    })


    describe("get all events", () => {
        it("get all events", () => {
            return request(app)
            .get('/events')
            .set('access_token', token)
            .then((response) => {
                expect(response.status).toBe(200)
                expect(response).toHaveProperty('body', expect.any(Array))
                expect(response.body[0]).toHaveProperty('NamaKegiatan', expect.any(String))
            })
        })
    })

    describe("events", () => {
        it("create event", () => {
            return request(app)
            .post('/events')
            .set('access_token', token)
            .send({
                NamaKegiatan: 'Hello Worlds',
                JamMulai: new Date(),
                JamSelesai: new Date()
            })
            .then((response) => {
                expect(response.status).toBe(201)
                expect(response.body).toHaveProperty('message', expect.any(String))
            })
        })

        it("shouldnot create events", () => {
            return request(app)
            .post('/events')
            .send({
                NamaKegiatan: 'Hello Worlds',
                JamMulai: new Date(),
                JamSelesai: new Date()
            })
            .then((response) => {
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty('message', expect.any(String))
            })
        })

        it("shouldnot create events", () => {
            return request(app)
            .post('/events')
            .send({
                NamaKegiatan: 'Hello Worlds',
                JamMulai: new Date(),
                JamSelesai: new Date()
            })
            .set('access_token', "token")
            .then((response) => {
                expect(response.status).toBe(400)
                expect(response.body).toHaveProperty('message', expect.any(String))
            })
        })

        it("shouldnot create events", () => {
            return request(app)
            .post('/events')
            .send({
                NamaKegiatan: 'Hello Worlds',
                JamMulai: new Date(),
            })
            .set('access_token', token)
            .then((response) => {
                expect(response.status).toBe(400)
                expect(response.body).toHaveProperty('message', expect.any(String))
            })
        })

        it("shouldnot create events", () => {
            return request(app)
            .post('/events')
            .send({
                NamaKegiatan: 'Hello Worlds',
                JamSelesai: new Date(),
            })
            .set('access_token', token)
            .then((response) => {
                expect(response.status).toBe(400)
                expect(response.body).toHaveProperty('message', expect.any(String))
            })
        })

        it("shouldnot create events", () => {
            return request(app)
            .post('/events')
            .send({
                JamMulai: new Date(),
                JamSelesai: new Date()
            })
            .set('access_token', token)
            .then((response) => {
                expect(response.status).toBe(400)
                expect(response.body).toHaveProperty('message', expect.any(String))
            })
        })

        it("update event", () => {
            return request(app)
            .put('/events/6411925f35eb63b45a339f70')
            .set('access_token', token)
            .send({
                NamaKegiatan: 'Hello Worlds',
            })
            .then((response) => {
                expect(response.status).toBe(200)
                expect(response.body).toHaveProperty('message', expect.any(String))
            })
        })

        it("delete update event", () => {
            return request(app)
            .delete('/events/6411925f35eb63b45a339f70')
            .set('access_token', token)
            .then((response) => {
                expect(response.status).toBe(200)
                expect(response.body).toHaveProperty('message', expect.any(String))
            })
        })
    })
})