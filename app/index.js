const { handleResponse } = require('./utils/index')
const MeterService = require('./service/meter')
const ClientService = require('./service/client')
const AccountService = require('./service/account')

const meterService = new MeterService()
const clientService = new ClientService()
const accountService = new AccountService()

module.exports.meterCreate = async (event, context) => {
    try {
        const meter = JSON.parse(event.body)
        const result = await meterService.create(meter)
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

module.exports.meterGetAll = async (event, context) => {
    try {
        const result = await meterService.getAll(event.queryStringParameters)
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

module.exports.meterUpdate = async (event, context) => {
    try {
        const meter = JSON.parse(event.body)
        const result = await meterService.update(meter, meter._id)
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

module.exports.clientGetAll = async (event, context) => {
    try {
        const result = await clientService.getAll(event.queryStringParameters)
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

module.exports.tariffCreate = async (event, context) => {
    try {
        const { tariff } = JSON.parse(event.body)
        const result = await accountService.createAccountByMeter(tariff)
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

module.exports.test = async (event, context) => {
    return handleResponse.handleSuccess(
        {
            event,
            context,
        },
        200
    )
}
