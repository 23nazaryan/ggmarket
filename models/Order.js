const {Schema, model} = require('mongoose')

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
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()}
})

order.pre('save', function preSave(next){
    const order = this
    order.updatedAt = Date.now()
    next()
});

module.exports = model('Order', order)