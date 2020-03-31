const {Schema, model} = require('mongoose')

const employee = new Schema({
    name: {
        type: String,
        required: true
    },
    biography: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    }
})

module.exports = model('Employee', employee)