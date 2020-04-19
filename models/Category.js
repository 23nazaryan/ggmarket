const {Schema, model} = require('mongoose')

const category = new Schema({
    title: {
        type: String,
        required: true
    },
    descr: {
        type: String
    },
    is_top: {
        type: Number,
        default: 0
    },
    for_slider: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    img: {
        type: String,
        default: null
    },
    parent_id: {
        type: Schema.Types.ObjectId,
        default: null
    }
})

module.exports = model('Category', category)