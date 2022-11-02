const connectToDatabase = require('../model/db')
const MeterModel = require('../model/meter')
const AccountModel = require('../model/account')
const ClientModel = require('../model/client')
const TariffModel = require('../model/tariff')
const { handlePagination } = require('../utils')


const create = async (account) => {
    await connectToDatabase()
    return await new AccountModel(account).save()
}

const update = async (account) => {
    await connectToDatabase()
    const query = { _id: account._id }
    return await AccountModel.findOneAndUpdate(query, account, { new: true })

}

const createAccountByMeter = async (client) => {
    await connectToDatabase()
    const result = []
    const tariffDocument = await TariffModel.findOne()
    if (!tariffDocument) return null
    for (let i = 0; i < client.waterMeters.length; i++) {
        let meterDocument = await MeterModel.findOne({
            serial: client.waterMeters[i].serial,
        })
        if (!meterDocument) {
            meterDocument = await new MeterModel({
                serial: client.waterMeters[i].serial,
            }).save()
        }
        let clientDocument = await ClientModel.findOne({ dni: client.dni })
        if (!clientDocument) {
            clientDocument = await new ClientModel(
                parseClient(client)
            ).save()
        }
        const accountDocument = await AccountModel.findOne({
            accountNumber: meterDocument.serial,
        })
        if (!accountDocument) {
            const newAccount = await new AccountModel({
                accountNumber: meterDocument.serial,
                sector: '',
                address: 'n/a',
                client: clientDocument._id,
                meter: meterDocument._id,
            }).save()
            result.push(newAccount)
        }
    }
    return result
}

const getAll = async (query) => {
    await connectToDatabase()
    const options = handlePagination.getPagination(query);
    delete query.limit;
    delete query.page;
    options.populate = ['client', 'meter', {
        path: 'tariff',
        strictPopulate: false,
        select: 'fixedCharge name valuePerm3 status'
    }]
    return await AccountModel.paginate(query, options)
}

const meterInAccount = async (serial) => {
    await connectToDatabase()
    console.log(serial)
    const meter = await MeterModel.findOne({ serial });
    if (!meter)
        return {}
    const result = await AccountModel.findOne({ meter: meter._id })
        .populate(['meter', 'client', 'tariff']);
    return result;
}

function parseClient(client) {
    const name = client.names === '' ? client.fullName : client.names
    const newclient = {
        dni: client.dni,
        dniType: client.dniType ? client.dniType : 'RUT',
        names: client.businessName ? client.businessName : name,
        middleName: client.middleName ? client.middleName : '',
        lastName: client.lastName ? client.lastName : '',
        personality: client.businessName
            ? 'LEGAL_PERSONALITY'
            : 'NATURAL_PERSONALITY',
        birthDate: client.birthDate ? client.birthDate : '',
        telephone: client.telephone ? client.telephone : '',
        email: client.email ? client.email : '',
        occupation: client.profession ? client.profession : '',
        status: 'ENABLED',
        nationality: 'CHILE',
    }
    return newclient
}

module.exports = {
    create,
    update,
    createAccountByMeter,
    getAll,
    meterInAccount
}
