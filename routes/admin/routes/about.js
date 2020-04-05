const {Router} = require('express')
const auth = require('../../../middleware/auth')
const About = require('../../../models/About')
const random = require('randomstring')
const image = require('../../../utils/image')
const router = new Router()
const layout = 'admin.main.hbs'

router.get('/', auth, async (req, res) => {
    try {
        const about = await About.find()

        res.render('admin/about/index', {
            layout: layout,
            title: 'Տեղեկություններ',
            isAbout: true,
            about
        })
    } catch (e) {
        console.log(e)
    }
})

router.get('/create', auth, async (req, res) => {
    try {
        res.render('admin/about/create', {
            layout: layout,
            title: 'Տեղեկություններ',
            isAbout: true,
            action: '/admin/about/create',
        })
    } catch (e) {
        console.log(e)
    }
})

router.post('/create', auth, async (req, res) => {
    try {
        const {text, buying, delivery, payment, email, tel, address, map_url, work_hours, facebook_link, instagram_link} = req.body
        let imageName = null

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.redirect('create')
        }

        const ext = '.'+req.files.img.mimetype.substring(6)
        imageName = random.generate(23)+ext
        await image.upload(req.files.img,'about', imageName)

        const features = req.body.features.split(',')
        const about = new About({
            text,
            features,
            buying,
            delivery,
            payment,
            email,
            tel,
            address,
            map_url,
            work_hours,
            facebook_link,
            instagram_link,
            img: imageName
        })

        await about.save()

        res.redirect('/admin/about')
    } catch (e) {
        console.log(e)
    }
})

router.get('/edit/:id', auth, async (req, res) => {
    try {
        const about = await About.findById(req.params.id)
        const features = about.features.join(',')

        res.render('admin/about/create', {
            layout: layout,
            title: 'Տեղեկություններ',
            isAbout: true,
            action: '/admin/about/edit/'+about._id,
            about,
            features
        })
    } catch (e) {
        console.log(e)
    }
})

router.post('/edit/:id', auth, async (req, res) => {
    try {
        const about = await About.findById(req.params.id)
        let imageName = about.img

        if (req.files) {
            await image.delete('about', imageName)
            const ext = '.'+req.files.img.mimetype.substring(6)
            imageName = random.generate(23)+ext
            await image.upload(req.files.img,'about', imageName)
        }

        Object.assign(about, req.body)
        about.features = req.body.features.split(',')
        about.img = imageName
        await about.save()

        res.redirect('/admin/about')
    } catch (e) {
        console.log(e)
    }
})

router.get('/delete/:id', auth, async (req, res) => {
    try {
        const about = await About.findById(req.params.id)
        await image.delete('about', about.img)
        about.delete()

        res.redirect('/admin/about')
    } catch (e) {
        console.log(e)
    }
})

module.exports = router