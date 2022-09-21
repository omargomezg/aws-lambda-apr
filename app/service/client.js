const connectToDatabase = require('../model/db')
const ClientModel = require('../model/client')
const { handlePagination } = require('../utils')

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
}

module.exports = clientService
