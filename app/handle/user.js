const { handleResponse } = require('../utils')
const UserService = require('../service/user')

const userService = new UserService();

module.exports.getByEmail = async (event, context) => {
    try {
        const result = await userService.getByEmail(event.queryStringParameters.email)
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

module.exports.create = async (event, context) => {
    try {
        const result = await userService.create(JSON.parse(event.body))
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
