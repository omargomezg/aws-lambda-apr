const connectToDatabase = require('../model/db')
const ClientModel = require('../model/client')
const { handlePagination } = require('../utils')
const AccountModel = require("../model/account");

const getAll = async (query) => {
    const options = handlePagination.getPagination(query);
    delete query.limit;
    delete query.page;
    await connectToDatabase()
    return await ClientModel.paginate(query, options)
}

const create = async (client) => {
    await connectToDatabase()
    const clientDocument = await ClientModel.findOne({ dni: client.dni })
    if (clientDocument == null) return await new ClientModel(client).save()
    return null
}

const update = async (client) => {
    await connectToDatabase()
    const query = { _id: client._id }
    return await ClientModel.findOneAndUpdate(query, client, { new: true })
}

const findByDni = async (dni) => { 
    await connectToDatabase()
    const client = await ClientModel.findOne({ dni: dni })
    return client ? client : {}
}

module.exports = {
    getAll,
    create,
    update,
    findByDni
}
