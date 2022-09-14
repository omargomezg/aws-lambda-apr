const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const clientSchema = new mongoose.Schema({
    dni: {type: String, required: true}

}, {
    timestamps: true
})

clientSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('client', clientSchema)
