const {Router} = require('express')
const About = require('../models/About')
const productHelper = require('../utils/productHelper')
const categoryHelper = require('../utils/categoryHelper')
const router = new Router()

router.get('/', async (req, res) => {
    try {
        const p = req.query.p
        const query = {
            is_sale: 1
        }
        const products = await productHelper.getProducts(p, query)
        const categories = await categoryHelper.getCategories()
        const about = await About.findOne()

        res.render('products-sales', {
            title: 'Զեղչված ապրանքներ',
            categories,
            products,
            about
        })
    } catch (e) {
        console.log(e)
    }
})

module.exports = router