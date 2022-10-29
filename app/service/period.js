const connectToDatabase = require('../model/db')
const PeriodModel = require('../model/period')
const { handlePagination } = require('../utils')

class PeriodService {
    constructor() {
    }

    async create(account) {
        await connectToDatabase()
        return await new PeriodModel(account).save()
    }

    async update(period) {
        await connectToDatabase()
        const query = {_id: period._id}
        const periodUpdated = await PeriodModel.findOneAndUpdate(query, period, {new: true})
        return periodUpdated;
    }

    async createAccountByMeter(client) {
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
            const accountDocument = await PeriodModel.findOne({
                accountNumber: meterDocument.serial,
            })
            if (!accountDocument) {
                const newAccount = await new PeriodModel({
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

    async getAll(query) {
        await connectToDatabase()
        const options = handlePagination.getPagination(query);
        delete query.limit;
        delete query.page;
        return await PeriodModel.paginate(query, options)
    }
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

module.exports = PeriodService;
