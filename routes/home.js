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
        const topCategories = await Category.find({parent_id: {$ne: null}, is_top: 1}).limit(9).sort([['views', 'descending']])
        const forSliders = await Category.find({for_slider: 1, parent_id: {$ne: null}}).limit(10).sort([['views', 'descending']])

        res.render('index', {
            title: 'Գլխավոր էջ',
            isHome: true,
            about,
            categories,
            saleProducts,
            topCategories,
            forSliders
        })
    } catch (e) {
        console.log(e)
    }
})

module.exports = router