const MeterModel = require('../model/meter')
const connectToDatabase = require('../model/db')
const {handlePagination} = require('../utils')

class MeterService {
    constructor() {
    }

    async getAll(query) {
        await connectToDatabase()
        const options = handlePagination.getPagination(query);
        delete query.limit;
        delete query.page;
        return await MeterModel.paginate(query, options)
    }

    async create(meter) {
        await connectToDatabase()
        return await new MeterModel({serial: meter.serial}).save()
    }

    async update(body, _id) {
        await connectToDatabase()
        const result = await MeterModel.findOneAndUpdate(_id, body, {
            new: true,
        })
        return result
    }
}

module.exports = MeterService
