const {Schema, model} = require('mongoose')

const service = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    descr: {
        type: String,
        required: true
    }
})

module.exports = model('Service', service)