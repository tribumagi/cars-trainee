const request = require('supertest')
const app = require('../../app')

describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
         await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200)
    })
})

describe('Test POST /launches', () => {
    test('It should respond with 200 success', async () => {
         await request(app)
            .post('/launches')
            .send({
                mission: 'USS Enterprise',
                rocket: 'NCC 1701-D',
                target: 'Kepler-186 f',
                launchDate: 'January 4, 2028',
            })
            .expect('Content-Type', /json/)
            .expect(201)

    })

    test('It should catch missing required properties', async () => {
        const response = await request(app)
            .post('/launches')
            .send({
                mission: 'USS Enterprise',
                rocket: 'NCC 1701-D',
                target: 'Kepler-186 f',
            })
            .expect('Content-Type', /json/)
            .expect(400)

        expect(response.body).toStrictEqual({
            error: 'Missing required launch property'
        })
    })

    test('It should catch invalid dates', () => {})
})
