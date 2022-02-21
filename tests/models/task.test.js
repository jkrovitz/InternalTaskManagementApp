import TestsHelpers from "../tests-helpers"
import models from "../../src/models"

describe('Task', () => {
    // set up
    beforeAll(async() => {
        await TestsHelpers.startDb()
    })

    // tare down
    afterAll(async() => {
        await TestsHelpers.stopDb()
    })

    // drops the tables before each test and re-creates them using the models definition, not the migration but the model's definition. That's why it's very important to match the mgirations with the models definitions. 
    beforeEach(async() => {
        await TestsHelpers.syncDb()
    })

    it('should delete the task records if the user is deleted', async() => {
        const { Task } = models
        const tasksForNewUser = ['work on report', 'work on write up']
        const user = await TestsHelpers.createNewUser({ tasks: tasksForNewUser })
        let tasksCount = await Task.count()
        expect(tasksCount).toEqual(tasksForNewUser.length)
        await user.destroy()
        tasksCount = await Task.count()
        expect(tasksCount).toEqual(0)
    })
})