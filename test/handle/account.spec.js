const handleAccount = require('../../app/handle/account')
const requestAccount = require('../mocks/account.json')
let id = '0'


describe('All Operations in account', () => {
    it('Create one', async () => {
        const event = {
            body: JSON.stringify(requestAccount.create.body)
        }
        const result = await handleAccount.create(event)
        const body = JSON.parse(result.body)
        id = body._id
        expect(body._id).toEqual(expect.any(String))
    })
    it('update', async ()=>{
        const request = requestAccount.create.body;
        request._id = id
        const event = {
            body: JSON.stringify(request)
        }
        const result = await handleAccount.update(event)
        const body = JSON.parse(result.body)
        console.log(body)
        expect(body._id).toEqual(id)
    })
    it('Retrieve all accounts', async () => {
        const event = {
            queryStringParameters: {
                limit: 2,
                page: 1,
            },
        }
        const result = await handleAccount.getAll(event)
        const body = JSON.parse(result.body)
        expect(body.totalDocs).toEqual(expect.any(Number))
    })
})
