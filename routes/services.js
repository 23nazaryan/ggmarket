const {Router} = require('express')
const Service = require('../models/Service')
const router = new Router()

router.get('/', async (req, res) => {
    try {
        const services = await Service.find({})
        res.render('services', {
            title: 'Ծառայություններ',
            isService: true,
            services
        })
    } catch (e) {
        console.log(e)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id)
        res.render('service', {
            title: service.title,
            isService: true,
            service
        })
    } catch (e) {
        console.log(e)
    }
})

module.exports = router