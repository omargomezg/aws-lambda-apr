const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const periodSchema = new mongoose.Schema({
    start: {type: Date, required: true},
    end: {type: Date, required: true}
}, {
    timestamps: true
})

periodSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('period', periodSchema)
