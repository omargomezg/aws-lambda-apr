const index = require('../app/index')
const request = require('./mocks/meter.json')
const requestClient = require('./mocks/client.json')
const requestClientAccount = require('./mocks/accountByClient.json')

describe('Create meter', () => {
    it('should be create a meter', async () => {
        const result = await index.meterCreate({
            body: JSON.stringify(request.create.body),
        })
        const body = JSON.parse(result.body)

        expect(body._id).toEqual(expect.any(String))
        expect(body.serial).toEqual(expect.any(String))
        expect(body.createdAt).toEqual(expect.any(String))
        expect(body.updatedAt).toEqual(expect.any(String))
        expect(result.statusCode).toBe(200)
    })
})

describe('Get meters', () => {
    it('Get all', async () => {
        const result = await index.meterGetAll()
        const body = JSON.parse(result.body)
        expect(body.totalDocs).toEqual(10)
    })
})

describe('Update meters', () => {
    it('Update Success', async () => {
        let result = await index.meterGetAll()
        let body = JSON.parse(result.body)
        const meterToUpdate = body.docs[0]
        meterToUpdate.serial = Math.floor(Math.random() * 999999).toString()
        result = await index.meterUpdate({
            body: JSON.stringify(meterToUpdate),
        })
        body = JSON.parse(result.body)
        expect(body.serial).toEqual(meterToUpdate.serial)
    })
})

describe('Get clients', () => {
    it('Get all', async () => {
        it('Get all', async () => {
            const event = {
                queryStringParameters: {
                    limit: 2,
                    page: 1,
                },
            }
            const result = await index.clientGetAll(event)
            const body = JSON.parse(result.body)
            console.log(result.body)
            expect(body.totalDocs).toEqual(expect.any(Number))
        })
    })
})

describe('Create client', () => {
    it('create one client', async () => {})

    it('create some clients', async () => {
        jest.setTimeout(220000)
        const result = await index.clientCreate({
            body: JSON.stringify(requestClient.createSeveral.body),
        })
        const body = JSON.parse(result.body)
        console.log(body)
        expect(body.message.length).toEqual(100)
    })
})

describe('Create Accountt', () => {
    it('create by client', async () => {
        const result = await index.accountCreateByMeter({
            body: JSON.stringify(requestClientAccount.body),
        })
        const body = JSON.parse(result.body)
        console.log(body)
        expect(body.message[0].accountNumber).toEqual('2903')
    })
})
