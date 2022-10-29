const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const meterSchema = new mongoose.Schema(
    {
        serial: {type: String, required: true},
        trademark: {type: String},
        diameter: {type: Number}
    },
    {
        timestamps: true,
    }
)

meterSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('meter', meterSchema)
