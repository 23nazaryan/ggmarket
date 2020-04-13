const {Router} = require('express')
const Category = require('../models/Category')
const About = require('../models/About')
const categoryHelper = require('../utils/categoryHelper')
const productHelper = require('../utils/productHelper')
const router = Router()

router.get('/', async (req, res) => {
    try {
        const about = await About.findOne()
        const categories = await categoryHelper.getCategories()
        const saleProducts = await productHelper.getHotSales()
        const topProducts = await productHelper.getTop()
        const forSliders = await categoryHelper.forSliders()

        res.render('index', {
            title: 'Գլխավոր էջ',
            isHome: true,
            about,
            categories,
            saleProducts,
            topProducts,
            forSliders,
            error: req.flash('error'),
            success: req.flash('success'),
        })
    } catch (e) {
        console.log(e)
    }
})

module.exports = router