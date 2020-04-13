const {Router} = require('express')
const About = require('../models/About')
const categoryHelper = require('../utils/categoryHelper')
const productHelper = require('../utils/productHelper')
const router = new Router()

router.post('/', async (req, res) => {
    try {
        const search = req.body.product

        if (!search.length) {
            return res.redirect('/')
        }

        const p = req.query.p
        const query = {
            keywords: {$regex: search, $options : 'i'},
            count: {$ne: 0}
        }
        const products = await productHelper.getProducts(p, query)
        const categories = await categoryHelper.getCategories()
        const forSliders = await categoryHelper.forSliders()
        const saleProducts = await productHelper.getHotSales()
        const about = await About.findOne()

        res.render('products-search', {
            title: 'Որոնման արդյունքներ',
            categories,
            forSliders,
            products,
            about,
            saleProducts
        })
    } catch (e) {
        console.log(e)
    }
})

module.exports = router