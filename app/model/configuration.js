const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const configurationSchema = new mongoose.Schema(
    {
        dni: { type: String, required: true },
    },
    {
        timestamps: true,
    }
)

configurationSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('configuration', configurationSchema)
