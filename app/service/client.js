const connectToDatabase = require('../model/db')
const ClientModel = require('../model/client')
const { handlePagination } = require('../utils')
const AccountModel = require("../model/account");

class clientService {
    constructor() {}

    async getAll(requestParams) {
        await connectToDatabase()
        return await ClientModel.paginate(
            {},
            handlePagination.getPagination(requestParams)
        )
    }

    async create(client) {
        await connectToDatabase()
        const clientDocument = await ClientModel.findOne({ dni: client.dni })
        if (clientDocument == null) return await new ClientModel(client).save()
        return null
    }

    async update(client) {
        await connectToDatabase()
        const query = {_id: client._id}
        return await ClientModel.findOneAndUpdate(query, client, {new: true})
    }
}

module.exports = clientService
