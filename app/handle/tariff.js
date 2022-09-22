const { handleResponse } = require('../utils')
const TariffService = require('../service/tariff')

const tariffService = new TariffService()

module.exports.getAll = async (event, context) => {
    try {
        const result = await tariffService.getAll(event.queryStringParameters)
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
        const result = await tariffService.create(event.body)
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
