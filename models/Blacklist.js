const {Schema, model} = require('mongoose')

const blacklist = new Schema({
    tel: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
})

module.exports = model('Blacklist', blacklist)