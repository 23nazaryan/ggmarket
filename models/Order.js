const {Schema, model} = require('mongoose')
const dateFormat = require('dateformat')

process.env.TZ = "Asia/Yerevan"

const order = new Schema({
    tel: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    products: {
        type: JSON,
        required: true
    },
    status: {
        type: Number,
        default: 0
    },
    amount: {
        type: Number,
        required: true
    },
    createdAt: {type: String, default: dateFormat(new Date(), "HH:MM dd-mm-yyyy")},
    updatedAt: {type: String, default: dateFormat(new Date(), "HH:MM dd-mm-yyyy")}
})

order.pre('save', function preSave(next){
    const order = this
    order.updatedAt = dateFormat(new Date(), "HH:MM dd-mm-yyyy")
    next()
});

module.exports = model('Order', order)