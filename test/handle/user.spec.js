const handleUser = require('../../app/handle/user')
const handleAccount = require("../../app/handle/account");

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
    it('get users', async ()=>{
        const event = {
            queryStringParameters: {
                limit: 2,
                page: 1,
                email: 'omar.fdo.gomez@gmail.com'
            },
        }
        const result = await handleUser.getByEmail(event)
        const body = JSON.parse(result.body)
        console.log(body);
        expect(body.totalDocs).toEqual(expect.any(Number))
    })
})
