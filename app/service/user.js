const connectToDatabase = require('../model/db')
const UserModel = require('../model/user')
const {handlePagination} = require('../utils')

class UserService {
    constructor() {
    }

    async getAll(query) {
        await connectToDatabase()
        const options = handlePagination.getPagination(query);
        delete query.page;
        delete query.limit;
        const user = await UserModel.paginate(query, options);
        return user;
    }

    async create(user) {
        await connectToDatabase()
        const userDocument = await UserModel.findOne({email: user.email})
        if (userDocument == null) return await new UserModel(user).save()
        userDocument.role = user.role;
        return await UserModel.findByIdAndUpdate({_id: userDocument._id}, user, {
            new: true
        })
    }
}

module.exports = UserService
