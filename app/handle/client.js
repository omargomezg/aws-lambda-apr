const ClientService = require('../service/client')
const {handleResponse} = require("../utils");

const clientService = new ClientService()

module.exports.createClient = async (event, context) => {
    try {
        const {client} = JSON.parse(event.body)
        const result = []
        result.push(await clientService.create(parseClient(client)))
        return handleResponse.handleSuccess({message: result}, 200)
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

module.exports.accountCreateByMeter = async (event, context) => {
    try {
        const {client} = JSON.parse(event.body)
        const result = await accountService.createAccountByMeter(client)
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

module.exports.updateClient = async (event, context) => {
    try {
        const client = JSON.parse(event.body)
        const result = await clientService.update(client)
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
