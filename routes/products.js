const {Router} = require('express')
const Category = require('../models/Category')
const Product = require('../models/Product')
const About = require('../models/About')
const categoryHelper = require('../utils/categoryHelper')
const productHelper = require('../utils/productHelper')
const router = new Router()

router.get('/:id', async (req, res) => {
    try {
        const p = req.query.p
        const query = {
            category_id: req.params.id,
            count: {$ne: 0}
        }
        const products = await productHelper.getProducts(p, query)
        const category = await Category.findById(req.params.id)
        const categories = await categoryHelper.getCategories()
        const about = await About.findOne()

        category.views++
        await category.save()

        res.render('products', {
            title: category.title,
            img: category.img,
            categories,
            products,
            about
        })
    } catch (e) {
        console.log(e)
    }
})

module.exports = router