const handleTariff = require('../../app/handle/tariff')
const requestTariff = require('../mocks/tariff.json')
let id;

describe('All Operations in account', () => {
    it('Retrieve all accounts', async () => {
        const event = {
            body: JSON.stringify(requestTariff.createOne.body)
        }
        const result = await handleTariff.post(event)
        const body = JSON.parse(result.body)
        expect(body.name).toEqual('gy')
        expect(body.createdAt).toEqual(expect.any(String))
        id = body._id
    })

    it('Update tariff', async() => {
        const tariff = requestTariff.createOne.body
        tariff._id = id
        tariff.name = 'name updated'
        const event = {
            body: JSON.stringify(tariff)
        }
        const result = await handleTariff.put(event)
        const body = JSON.parse(result.body)
        expect(body.name).toEqual('name updated')
    })

    it('Delete tariff', async() => {
        const event = {
            queryStringParameters: {
                _id: id
            }
        }
        const result = await handleTariff.delete(event)
        console.log(result)
        const body = JSON.parse(result.body)
        expect(body.deletedCount).toEqual(1)
        expect(body.acknowledged).toEqual(true)
    })
})
