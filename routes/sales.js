const {Router} = require('express')
const About = require('../models/About')
const productHelper = require('../utils/productHelper')
const categoryHelper = require('../utils/categoryHelper')
const router = new Router()

router.get('/', async (req, res) => {
    try {
        const p = req.query.p
        const query = {
            is_sale: 1,
            count: {$ne: 0}
        }
        const products = await productHelper.getProducts(p, query)
        const categories = await categoryHelper.getCategories()
        const forSliders = await categoryHelper.forSliders()
        const about = await About.findOne()

        res.render('products-sales', {
            title: 'Զեղչված ապրանքներ',
            forSliders,
            categories,
            products,
            about
        })
    } catch (e) {
        console.log(e)
    }
})

module.exports = router