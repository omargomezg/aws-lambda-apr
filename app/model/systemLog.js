const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2')

const systemLogSchema = new mongoose.Schema({
    source: {type: String, required: true},
    address: {type: String, required: true},
    client: {type: Schema.ObjectId, ref: 'client'},
    meter: {type: Schema.ObjectId, ref: 'meter'},
    readingHistory: [{
        period: {type: Schema.ObjectId, ref: 'period'},
        readingAt: {type: Date, required: true},
        start: {type: Number, required: true},
        end: {type: Number, required: true}
    }]

}, {
    timestamps: true
})

systemLogSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('account', systemLogSchema)
