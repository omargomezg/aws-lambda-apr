const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const tariffSchema = new mongoose.Schema({
    name: {type: String, required: true},
    fixedCharge: {type: Number, required: true},
    valuePerm3: {type: Number, required: true}

}, {
    timestamps: true
})

tariffSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('tariffs', tariffSchema)
