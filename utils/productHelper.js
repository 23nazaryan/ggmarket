const Product = require('../models/Product')

const getHotSales = async function(productId = null, limit = 4)
{
    return await Product.find({_id: {$ne: productId}, is_sale: 1}).limit(limit).sort([['views', 'descending']])
}

const getSimilar = async function(categoryId, productId)
{
    return await Product.find({category_id: categoryId, _id: {$ne: productId}}).limit(4).sort([['views', 'descending']])
}

module.exports.getHotSales = getHotSales
module.exports.getSimilar = getSimilar