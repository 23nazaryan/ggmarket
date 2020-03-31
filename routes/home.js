const {Router} = require('express')
const Service = require('../models/Service')
const router = Router()

router.get('/', async (req, res) => {
    try {
        const services = await Service.find().limit(4)

        res.render('index', {
            title: 'Գլխավոր էջ',
            isHome: true,
            services
        })
    } catch (e) {
        console.log(e)
    }
})

module.exports = router