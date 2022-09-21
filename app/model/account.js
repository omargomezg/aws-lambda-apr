const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const accountSchema = new mongoose.Schema(
    {
        accountNumber: { type: String, required: true },
        sector: { type: String },
        address: { type: String, required: true },
        client: { type: Schema.ObjectId, ref: 'client' },
        meter: { type: Schema.ObjectId, ref: 'meter' },
        tariff: { type: Schema.ObjectId, ref: 'tariff' },
        readingHistory: [
            {
                period: { type: Schema.ObjectId, ref: 'period' },
                readingAt: { type: Date, required: true },
                start: { type: Number, required: true },
                end: { type: Number, required: true },
            },
        ],
    },
    {
        timestamps: true,
    }
)

accountSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('account', accountSchema)
