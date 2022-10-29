const connectToDatabase = require('../model/db')
const UserModel = require('../model/user')
const {handlePagination} = require('../utils')
const AccountModel = require("../model/account");

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

    async update(user) {
        await connectToDatabase()
        const query = {_id: user._id}
        const userUpdated = await UserModel.findOneAndUpdate(query, user, {new: true})
        return userUpdated;
    }

    async create(user) {
        await connectToDatabase()
        const userDocument = await UserModel.findOne({email: user.email})
        if (userDocument == null) return await new UserModel(user).save()
        userDocument.role = user.role;
        const newUser = await UserModel.findByIdAndUpdate({_id: userDocument._id}, user, {
            new: true
        })
        return newUser;
    }
}

module.exports = UserService
