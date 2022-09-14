const connectToDatabase = require("../model/db");
const ClientModel = require("../model/client");

class clientService {
    constructor() {
    }

    async getAll(queryParams) {
        await connectToDatabase();
        return await ClientModel.paginate({}, {});
    }

    async create(client) {
        await connectToDatabase();
        const clientDocument = await ClientModel.findOne({dni: client.dni});
        if (clientDocument == null)
            return await new ClientModel(client).save();
        return null;
    }

}

module.exports = clientService
