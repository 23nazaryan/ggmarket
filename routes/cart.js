const {Router} = require('express')
const About = require('../models/About')
const categoryHelper = require('../utils/categoryHelper')
const router = new Router()

router.post('/', async (req, res) => {
    try {
        const categories = await categoryHelper.getCategories()
        const about = await About.findOne()
        const products = req.body.products

        res.render('cart', {
            title: 'Պատվեր',
            isCart: true,
            categories,
            about,
            products
        })
    } catch (e) {
        console.log(e)
    }
})

module.exports = router