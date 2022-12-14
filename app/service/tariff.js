const connectToDatabase = require('../model/db')
const MeterModel = require('../model/meter')
const AccountModel = require('../model/account')
const ClientModel = require('../model/client')
const TariffModel = require('../model/tariff')
const {handlePagination} = require("../utils");

class TariffService {
    constructor() {}

    async getAll(requestParams) {
        await connectToDatabase()
        return await TariffModel.paginate(
            {},
            handlePagination.getPagination(requestParams)
        )
    }

    async create(tariff) {
        await connectToDatabase()
        return await new TariffModel({
            name: tariff.name,
            fixedCharge: tariff.fixedCharge,
            valuePerm3: tariff.valuePerm3,
            status: tariff.status
        }).save()
    }

    async update(tariff) {
        await connectToDatabase()
        const tariffDocument = await TariffModel.findById(tariff._id);
        tariffDocument.name = tariff.name;
        tariffDocument.fixedCharge = tariff.fixedCharge;
        tariffDocument.valuePerm3 = tariff.valuePerm3;
        return await tariffDocument.save();
    }

    async delete(_id) {
        await connectToDatabase()
        return await TariffModel.deleteOne({_id});
    }

    async createback(client) {
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
}

module.exports = TariffService
