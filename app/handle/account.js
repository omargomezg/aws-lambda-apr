const { handleResponse } = require('../utils')
const AccountService = require('../service/account')

const accountService = new AccountService()

module.exports.getAll = async (event, context) => {
    try {
        const result = await accountService.getAll(event.queryStringParameters)
        return handleResponse.handleSuccess(result, 200)
    } catch (err) {
        console.log(err)
        return {
            statusCode: err.statusCode || 500,
            body: JSON.stringify({
                error: err.message || 'An error has occurred.',
            }),
        }
    }
}
