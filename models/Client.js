const {Schema, model} = require('mongoose')

const client = new Schema({
    confirmed: {
        type: Number,
        defaultValue: 0
    },
    key: {
        type: String,
        defaultValue: null
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    tel: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    employee_id: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    date: {
        type: String,
        required: true
    }
})

module.exports = model('Client', client)