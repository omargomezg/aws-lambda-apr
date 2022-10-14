const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

/**
 * Account
 * @function account
 * @memberOf accountSchema
 * @this accountSchema
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultTypeKey, {address: {type: StringConstructor, required: boolean}, meter: {ref: string, type: *}, document: {type: StringConstructor}, client: {ref: string, type: *}, tariff: {ref: string, type: *}, readingHistory: [{period: {ref: string, type: *}, readingAt: {type: DateConstructor, required: boolean}, start: {type: NumberConstructor, required: boolean}, end: {type: NumberConstructor, required: boolean}}], accountNumber: {type: StringConstructor, required: boolean}, sector: {type: StringConstructor}, status: {default: string, type: StringConstructor}}>}
 */
const accountSchema = new mongoose.Schema(
    {
        accountNumber: {type: String, required: true},
        sector: {type: String},
        address: {type: String, required: true},
        document: {type: String},
        client: {type: Schema.ObjectId, ref: 'client'},
        meter: {type: Schema.ObjectId, ref: 'meter'},
        tariff: {type: Schema.ObjectId, ref: 'tariff'},
        status: {type: String, default: 'DRAFT'},
        readingHistory: [
            {
                period: {type: Schema.ObjectId, ref: 'period'},
                readingAt: {type: Date, required: true},
                start: {type: Number, required: true},
                end: {type: Number, required: true},
            },
        ],
    },
    {
        timestamps: true,
    }
)

accountSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('account', accountSchema)
