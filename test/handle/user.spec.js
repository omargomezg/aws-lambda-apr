const handleUser = require('../../app/handle/user')

describe('All Operations in account', () => {
    it('User create', async () => {
            const event = {
                body: {
                    email: 'omar.gomez@outlook.cl',
                    role: 'Finance',
                },
            }
            const result = await handleUser.create(event)
            const body = JSON.parse(result.body)

            console.log(body)
            expect(body._id).toEqual(expect.any(String))
        })
})
