import TestHelpers from '../tests-helpers'
import models from '../../src/models'

describe('User', () => {

    // set up
    beforeAll(async() => {
        await TestHelpers.startDb()
    })

    // tare down
    afterAll(async() => {
        await TestHelpers.stopDb()
    })

    // drops the tables before each test and re-creates them using the models definition, not the migration but the model's definition. That's why it's very important to match the mgirations with the models definitions. 
    beforeEach(async() => {
        await TestHelpers.syncDb()
    })

    describe('static methods', () => {
        describe('hashPassword', () => {
            it('should hash the password passesd in the arguments', async() => {
                const { User } = models
                const password = 'Test123#'
                const hashedPassword = await User.hashPassword(password)
                expect(password).not.toEqual(hashedPassword);
            })
        })

        describe('createNewUser', () => {
            it('should create a new user successfully', async() => {
                const { User } = models
                const data = {
                    email: 'test@example.com',
                    password: 'Test123#',
                    tasks: ['work on report', 'work on write up'],
                    username: 'test',
                    firstName: 'Jeremy',
                    lastName: 'Krovitz',
                    refreshToken: 'test-refresh-token'
                }
                const newUser = await User.createNewUser(data)
                const usersCount = await User.count()
                expect(usersCount).toEqual(1)
                expect(newUser.email).toEqual(data.email)
                expect(newUser.password).toBeUndefined
                expect(newUser.username).toEqual(data.username)
                expect(newUser.firstName).toEqual(data.firstName)
                expect(newUser.lastName).toEqual(data.lastName)
                expect(newUser.RefreshToken.token).toEqual(data.refreshToken)
                expect(newUser.Tasks.length).toEqual(2)
                const savedTasks = newUser.Tasks.map(savedTask => savedTask.task).sort(); // each one of these tasks elements, because remember, tasks is an array of tasks objects,, so each saved tasks is a task object and each task object you can call this task method
                expect(savedTasks).toEqual(data.tasks.sort()) // we use sort to make ure that the two arrays are equal
            })
        })
    })
})