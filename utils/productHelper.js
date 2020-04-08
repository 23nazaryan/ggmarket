const Product = require('../models/Product')

const getProducts = async function(p, query)
{
    const options = {
        page: parseInt(p, 10) || 1,
        limit: 16
    }
    const products = await Product.paginate(query, options)
    const pagination = {
        page: products.page,
        pageCount: products.pages,
        display: (products.total > 16) ? true : false
    }

    return {docs: products.docs, pagination}
}

const getHotSales = async function(productId = null, limit = 8)
{
    return await Product.find({_id: {$ne: productId}, is_sale: 1}).limit(limit).sort([['views', 'descending']])
}

const getSimilar = async function(categoryId, productId)
{
    return await Product.find({category_id: categoryId, _id: {$ne: productId}}).limit(4).sort([['views', 'descending']])
}

const getTop = async function()
{
    return await Product.find({is_top: 1}).limit(9).sort([['views', 'descending']])
}

module.exports.getProducts = getProducts
module.exports.getHotSales = getHotSales
module.exports.getSimilar = getSimilar
module.exports.getTop = getTop