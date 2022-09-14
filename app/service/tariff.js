const connectToDatabase = require("../model/db");
const MeterModel = require('../model/meter');
const AccountModel = require('../model/account')
const ClientModel = require('../model/client')
const TariffModel = require('../model/tariff')

class TariffService {

    constructor() {
    }

    async create(client) {
        await connectToDatabase();
        const result = [];
        const tariffDocument = await TariffModel.findOne();
        if (!tariffDocument)
            return null
        for (let i = 0; i < client.waterMeters.length; i++) {
            let meterDocument = await MeterModel.findOne({serial: client.waterMeters[i].serial});
            if (!meterDocument) {
                meterDocument = await new MeterModel({serial: client.waterMeters[i].serial}).save();
            }
            let clientDocument = await ClientModel.findOne({dni: client.dni})
            if (!clientDocument) {
                clientDocument = await new ClientModel(parseClient(client)).save();
            }
            const accountDocument = await AccountModel.findOne({accountNumber: meterDocument.serial})
            if (!accountDocument) {
                const newAccount = await new AccountModel({
                    accountNumber: meterDocument.serial,
                    sector: '',
                    address: 'n/a',
                    client: clientDocument._id,
                    meter: meterDocument._id
                }).save()
                result.push(newAccount);
            }
        }
        return result;
    }

}

module.exports = TariffService;
