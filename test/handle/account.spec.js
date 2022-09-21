const handleAccount = require('../../app/handle/account')

describe('All Operations in account', () => {
    it('Retrieve all accounts', async () => {
            const event = {
                queryStringParameters: {
                    limit: 2,
                    page: 1,
                },
            }
            const result = await handleAccount.getAll(event)
            const body = JSON.parse(result.body)
            console.log(body)
            expect(body.totalDocs).toEqual(expect.any(Number))
        })
})
