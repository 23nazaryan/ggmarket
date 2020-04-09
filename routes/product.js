const {Router} = require('express')
const Product = require('../models/Product')
const About = require('../models/About')
const categoryHelper = require('../utils/categoryHelper')
const productHelper = require('../utils/productHelper')
const router = new Router()

router.get('/:id', async (req, res) => {
    try {
        const categories = await categoryHelper.getCategories()
        const about = await About.findOne()
        const product = await Product.findOne({_id: req.params.id, count: {$ne: 0}})
        const saleProducts = await productHelper.getHotSales(product._id)
        const similar = await productHelper.getSimilar(product.category_id, product._id)

        product.views++
        await product.save()

        res.render('product', {
            title: product.title,
            categories,
            saleProducts,
            about,
            product,
            similar
        })
    } catch (e) {
        console.log(e)
    }
})

module.exports = router