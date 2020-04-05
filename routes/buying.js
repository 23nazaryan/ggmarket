const {Router} = require('express')
const About = require('../models/About')
const categoryHelper = require('../utils/categoryHelper')
const router = new Router()

router.get('/', async (req, res) => {
    try {
        const categories = await categoryHelper.getCategories()
        const about = await About.findOne()

        res.render('buying', {
            title: 'Պատվիրում, առաքում և վճարում',
            categories,
            about
        })
    } catch (e) {
        console.log(e)
    }
})

module.exports = router