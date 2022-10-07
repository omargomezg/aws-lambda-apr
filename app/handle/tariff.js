const { handleResponse } = require('../utils')
const TariffService = require('../service/tariff')

const tariffService = new TariffService()

module.exports.get = async (event, context) => {
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

module.exports.post = async (event, context) => {
    try {
        const tariff = JSON.parse(event.body)
        const result = await tariffService.create(tariff)
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

module.exports.put = async (event, context) => {
    try {
        const tariff = JSON.parse(event.body)
        const result = await tariffService.update(tariff)
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

module.exports.delete = async (event, context) => {
    try {
        const {_id} = event.queryStringParameters;
        const result = await tariffService.delete(_id)
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
