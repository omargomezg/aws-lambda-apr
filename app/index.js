const {handleResponse} = require('./utils/index')
const MeterService = require('./service/meter');
const ClientService = require('./service/client');
const AccountService = require('./service/account');

const meterService = new MeterService();
const clientService = new ClientService();
const accountService = new AccountService();

module.exports.meterCreate = async (event, context) => {
    try {
        const meter = JSON.parse(event.body)
        const result = await meterService.create(meter)
        return handleResponse.handleSuccess(result, 200);
    } catch (err) {
        console.log(err)
        return {
            statusCode: err.statusCode || 500,
            body: JSON.stringify({
                error: err.message || 'An error has occurred.'
            })
        }
    }
}

module.exports.meterGetAll = async (event, context) => {
    try {
        const result = await meterService.getAll()
        return handleResponse.handleSuccess(result, 200);
    } catch (err) {
        console.log(err)
        return {
            statusCode: err.statusCode || 500,
            body: JSON.stringify({
                error: err.message || 'An error has occurred.'
            })
        }
    }
}

module.exports.meterUpdate = async (event, context) => {
    try {
        const meter = JSON.parse(event.body)
        const result = await meterService.update(meter, meter._id)
        return handleResponse.handleSuccess(result, 200);
    } catch (err) {
        console.log(err)
        return {
            statusCode: err.statusCode || 500,
            body: JSON.stringify({
                error: err.message || 'An error has occurred.'
            })
        }
    }
}

module.exports.clientGetAll = async (event, context) => {
    try {
        const result = await clientService.getAll()
        return handleResponse.handleSuccess(result, 200);
    } catch (err) {
        console.log(err)
        return {
            statusCode: err.statusCode || 500,
            body: JSON.stringify({
                error: err.message || 'An error has occurred.'
            })
        }
    }
}

module.exports.clientCreate = async (event, context) => {
    try {
        const {clients, client} = JSON.parse(event.body);
        const result = [];
        if (clients) {
            for (const client of clients) {
                const clientCreated = await clientService.create(parseClient(client))
                if (clientCreated.names) {
                    result.push(newClient);
                }
            }
        } else {
            result.push(await clientService.create(parseClient(client)))
        }
        return handleResponse.handleSuccess({message: result}, 200);
    } catch (err) {
        console.log(err)
        return {
            statusCode: err.statusCode || 500,
            body: JSON.stringify({
                error: err.message || 'An error has occurred.'
            })
        }
    }
}

module.exports.accountCreateByMeter = async (event, context) => {
    try {
        const {client} = JSON.parse(event.body);
        const result = await accountService.createAccountByMeter(client)
        return handleResponse.handleSuccess(result, 200);
    } catch (err) {
        console.log(err)
        return {
            statusCode: err.statusCode || 500,
            body: JSON.stringify({
                error: err.message || 'An error has occurred.'
            })
        }
    }
}

module.exports.tariffCreate = async (event, context) => {
    try {
        const {tariff} = JSON.parse(event.body);
        const result = await accountService.createAccountByMeter(tariff)
        return handleResponse.handleSuccess(result, 200);
    } catch (err) {
        console.log(err)
        return {
            statusCode: err.statusCode || 500,
            body: JSON.stringify({
                error: err.message || 'An error has occurred.'
            })
        }
    }
}

function parseClient(client) {
    return {
        dni: client.dni,
        dniType: client.dniType ? client.dniType : 'RUT',
        names: client.businessName ? client.businessName : client.names,
        middleName: client.middleName ? client.middleName : '',
        lastName: client.lastName ? client.lastName : '',
        personality: client.businessName ? 'LEGAL_PERSONALITY' : 'NATURAL_PERSONALITY',
        birthDate: client.birthDate ? client.birthDate : '',
        telephone: client.telephone ? client.telephone : '',
        email: client.email ? client.email : '',
        occupation: client.profession ? client.profession : '',
        status: 'ENABLED',
        nationality: 'CHILE'
    }
}
