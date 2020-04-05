const {Schema, model} = require('mongoose')

const about = new Schema({
    text: {
        type: String,
        required: true
    },
    features: [{
        type: String
    }],
    img: {
        type: String
    },
    buying: {
        type: String,
        required: true
    },
    delivery: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    map_url: {
        type: String
    },
    work_hours: {
        type: String,
        required: true
    },
    facebook_link: {
        type: String,
    },
    instagram_link: {
        type: String
    }
})

module.exports = model('About', about)