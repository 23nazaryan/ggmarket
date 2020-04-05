const {Router} = require('express')
const Category = require('../models/Category')
const Product = require('../models/Product')
const About = require('../models/About')
const categoryHelper = require('../utils/categoryHelper')
const router = new Router()

router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        const products = await Product.find({category_id: req.params.id})
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