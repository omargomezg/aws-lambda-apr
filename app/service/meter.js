const MeterModel = require('../model/meter')
const connectToDatabase = require('../model/db')


class meterService {

    constructor() {
    }

    async getAll(queryParams) {
        await connectToDatabase();
        return await MeterModel.paginate({}, {});
    }

    async create(meter) {
        await connectToDatabase();
        return await new MeterModel({serial: meter.serial}).save();
    }

    async update(body, _id) {
        await connectToDatabase()
        const result = await MeterModel.findOneAndUpdate(_id,
            body,
            {new: true});
        return result;
    }

}

module.exports = meterService
