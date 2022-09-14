const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const clientSchema = new mongoose.Schema({
    dni: {type: String, required: true},
    dniType: {type: String, required: true},
    names: {type: String, required: true},
    middleName: {type: String, required: false},
    lastName: {type: String, required: false},
    personality: {type: String, required: true},
    birthDate: {type: Date},
    telephone: {type: String},
    email: {type: String},
    occupation: {type: String},
    status: {type: String},
    nationality: {type: String}

}, {
    timestamps: true
})

clientSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('client', clientSchema)
