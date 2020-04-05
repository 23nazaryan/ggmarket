const {Schema, model} = require('mongoose')
const paginate = require('mongoose-paginate')

const product = new Schema({
    title: {
        type: String,
        required: true
    },
    descr: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    new_price: {
        type: Number,
        default: null
    },
    sale_type: {
        type: Number,
        default: 0
    },
    count: {
        type: Number,
        default: 0
    },
    is_top: {
        type: Number,
        default: 0
    },
    is_sale: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    keywords: {
        type: String,
        default: null
    },
    img: {
        type: String,
        default: null
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
})

product.plugin(paginate)

module.exports = model('Product', product)