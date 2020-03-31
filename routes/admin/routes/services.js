const {Router} = require('express')
const Service = require('../../../models/Service')
const auth = require('../../../middleware/auth')
const path = require('path')
const fs = require('fs')
const image = require('../../../utils/image')
const router = new Router()
const layout = 'admin.main.hbs'

router.get('/', auth, async (req, res) => {
    try {
        const services = await Service.find()

        res.render('admin/services/index', {
            layout: layout,
            title: 'Ծառայություններ',
            isServices: true,
            services
        })
    } catch (e) {
        console.log(e)
    }
})

router.get('/create', auth, (req, res) => {
    res.render('admin/services/create', {
        layout: layout,
        title: 'Ավելացնել ծառայություն',
        isServices: true,
        action: 'create'
    })
})

router.post('/create', auth, async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.redirect('/admin/services/create')
        }

        const {title, price, descr} = req.body
        const service = new Service({
            title, price, descr
        })
        await service.save()
        const imageName = service._id+'.jpg'
        await image.upload(req.files.img,'services', imageName)

        res.redirect('/admin/services')
    } catch (e) {
        console.log(e)
    }
})

router.get('/:id/edit', auth, async (req, res) => {
    try {
        const service = await Service.findById(req.params.id)
        const file = path.join(__dirname, '../../../public')+'/images/services/'+service._id+'.jpg'
        let image = false

        if (fs.existsSync(file)) {
            image = true
        }

        res.render('admin/services/create', {
            layout: layout,
            title: 'Փոխել ծառայությունը',
            isServices: true,
            action: 'edit',
            image,
            service
        })
    } catch (e) {
        console.log(e)
    }
})

router.post('/:id/edit', auth, async (req, res) => {
    try {
        const service = await Service.findById(req.params.id)
        Object.assign(service, req.body)
        await service.save()

        if (req.files) {
            const imageName = service._id+'.jpg'
            await image.delete('services', imageName)
            await image.upload(req.files.img,'services', imageName)
        }

        res.redirect('/admin/services')
    } catch (e) {
        console.log(e)
    }
})

router.get('/:id/delete', auth, async (req, res) => {
    try {
        await Service.deleteOne({
            _id: req.params.id
        })
        const imageName = req.params.id+'.jpg'
        await image.delete('services', imageName)

        res.redirect('/admin/services')
    } catch (e) {
        console.log(e)
    }
})

module.exports = router