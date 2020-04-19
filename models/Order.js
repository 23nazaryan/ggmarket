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
    amount: {
        type: Number,
        required: true
    }
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = model('Order', order)