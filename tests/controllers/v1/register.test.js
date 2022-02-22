import TestsHelpers from "../../tests-helpers"
import models from "../../../src/models"
import request from 'supertest' // super test will allow us to make fake requests to our applicaiton

describe('register', () => {
    let app

    // set up
    beforeAll(async() => {
        await TestsHelpers.startDb()
        app = TestsHelpers.getApp()
    })

    // tare down
    afterAll(async() => {
        await TestsHelpers.stopDb()
    })

    // drops the tables before each test and re-creates them using the models definition, not the migration but the model's definition. That's why it's very important to match the mgirations with the models definitions. 
    beforeEach(async() => {
        await TestsHelpers.syncDb()
    })

    it('should register a new user successfully', async() => {
        const data = {
            email: 'test@example.com',
            password: 'Test123#',
            username: 'test',
            firstName: 'Jeremy',
            lastName: 'Krovitz',
            tasks: ['work on report', 'work on write up'],
        }
        const response = await request(app).post('/v1/register').send(data).expect(200)
        expect(response.body.success).toEqual(true)
        expect(response.body.message).toEqual('User successfully registered')
        const { User, Task, RefreshToken } = models
        const users = await User.findAll({
            include: [Task, RefreshToken]
        })
        expect(users.length).toEqual(1)
        const newUser = users[0]
        expect(newUser.email).toEqual(data.email)
        expect(newUser.username).toEqual(data.username)
        expect(newUser.firstName).toEqual(data.firstName)
        expect(newUser.lastName).toEqual(data.lastName)
        expect(newUser.password).toBeUndefined() // we don't return the password
        expect(newUser.Task.length).toEqual(data.tasks.length)
        const savedTask = newUser.Task.map(savedTask => savedTask.task).sort()
        expect(savedTask).toEqual(data.tasks.sort())
        expect(newUser.RefreshToken.token).toEqual(expect.any(String))
    })

    it('should not create a new user if it already exists', async() => {
        await request(app)
            .post('/v1/register')
            .send({ email: 'test@example.com', password: 'Test123', username: 'test' })
            .expect(200)
        const response = await request(app)
            .post('/v1/register')
            .send({
                email: 'test@example.com',
                password: 'Test123',
                username: 'test'
            })
            .expect(200)
            // expect(response.body.success).toEqual(false)
        expect(response.body.message).toEqual('User already exists')

    })
})