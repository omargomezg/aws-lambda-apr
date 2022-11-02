const MeterModel = require('../model/meter')
const connectToDatabase = require('../model/db')
const { handlePagination } = require('../utils')
const client = require("../model/client");


const getAll = async (query) => {
    await connectToDatabase()
    const options = handlePagination.getPagination(query);
    delete query.limit;
    delete query.page;
    return await MeterModel.paginate(query, options)
}

const create = async (meter) => {
    await connectToDatabase()
    return await new MeterModel({ serial: meter.serial }).save()
}

const update = async (body) => {
    await connectToDatabase()
    const result = await MeterModel.findOneAndUpdate({ _id: client._id }, body, {
        new: true,
    })
    return result
}

const getBySerial = async (serial) => {
    await connectToDatabase()
    const meter = await MeterModel.findOne({ serial });
    return meter ? meter : {}
}

module.exports = {
    getAll,
    create,
    update,
    getBySerial
}
