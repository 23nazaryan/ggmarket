const {Schema, model} = require('mongoose')

const admin = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = model('Admin', admin)