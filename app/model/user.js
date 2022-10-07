const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        role: { type: String }
    },
    {
        timestamps: true,
    }
)

userSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('user', userSchema)
