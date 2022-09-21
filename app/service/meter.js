const MeterModel = require('../model/meter')
const connectToDatabase = require('../model/db')
const { handlePagination } = require('../utils')

class meterService {
    constructor() {}

    async getAll(requestParams) {
        await connectToDatabase()
        return await MeterModel.paginate(
            {},
            handlePagination.getPagination(requestParams)
        )
    }

    async create(meter) {
        await connectToDatabase()
        return await new MeterModel({ serial: meter.serial }).save()
    }

    async update(body, _id) {
        await connectToDatabase()
        const result = await MeterModel.findOneAndUpdate(_id, body, {
            new: true,
        })
        return result
    }
}

module.exports = meterService
