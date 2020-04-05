const {Router} = require('express')
const auth = require('../../../middleware/auth')
const Category = require('../../../models/Category')
const random = require('randomstring')
const image = require('../../../utils/image')
const router = new Router()
const layout = 'admin.main.hbs'

router.get('/index/:type?/:id?/', auth, async (req, res) => {
    try {
        const type = req.params.type
        const id = req.params.id
        let categories
        let title
        let sub = false
        let top = false

        switch (type) {
            case 'sub':
                title = 'Ենթաբաժիններ'
                sub = true

                if (id) {
                    categories = await Category.find({parent_id: id}).populate('parent_id')
                } else {
                    categories = await Category.find({parent_id: {$ne: null}}).populate('parent_id')
                }

                break
            case 'top':
                title = 'Թոփ բաժիններ'
                sub = true
                top = true
                categories = await Category.find({parent_id: {$ne: null}, is_top: 1}).populate('parent_id')
                break
            default:
                title = 'Գլխավոր բաժիններ'
                categories = await Category.find({parent_id: null})
                break
        }

        res.render('admin/categories/index', {
            layout: layout,
            title: title,
            isCategories: true,
            sub,
            top,
            categories,
            type
        })
    } catch (e) {
        console.log(e)
    }
})

router.get('/create/:type?', auth, async (req, res) => {
    try {
        const type = req.params.type
        const categories = await Category.find({parent_id: null})

        res.render('admin/categories/create', {
            layout: layout,
            title: 'Ավելացնել բաժին',
            isCategories: true,
            action: '/admin/categories/create',
            type,
            categories
        })
    } catch (e) {
        console.log(e)
    }
})

router.post('/create', auth, async (req, res) => {
    try {
        const {title, descr, is_top, for_slider, parent_id, type} = req.body
        let imageName = null

        if (type) {
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.redirect('create')
            }

            const ext = '.'+req.files.img.mimetype.substring(6)
            imageName = random.generate(23)+ext
            await image.upload(req.files.img,'categories', imageName)
        }

        const category = new Category({
            title,
            descr,
            is_top: is_top || 0,
            for_slider: for_slider || 0,
            parent_id,
            img: imageName
        })

        await category.save()

        res.redirect('/admin/categories/index/'+req.body.type)
    } catch (e) {
        console.log(e)
    }
})

router.get('/edit/:id/:type?', auth, async (req, res) => {
    try {
        const type = req.params.type
        const category = await Category.findById(req.params.id)
        const categories = await Category.find({parent_id: null})

        res.render('admin/categories/create', {
            layout: layout,
            title: 'Փոխել բաժինը',
            isCategories: true,
            action: '/admin/categories/edit/'+category._id,
            type,
            categories,
            category
        })

    } catch (e) {
        console.log(e)
    }
})

router.post('/edit/:id', auth, async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        let imageName = category.img

        if (req.files) {
            await image.delete('categories', imageName)
            const ext = '.'+req.files.img.mimetype.substring(6)
            imageName = random.generate(23)+ext
            await image.upload(req.files.img,'categories', imageName)
        }

        Object.assign(category, req.body)
        const is_top = req.body.is_top || 0
        const for_slider = req.body.for_slider || 0
        category.is_top = is_top
        category.for_slider = for_slider
        category.img = imageName
        await category.save()

        res.redirect('/admin/categories/index/'+req.body.type)
    } catch (e) {
        console.log(e)
    }
})

router.get('/delete/:id/:type?', auth, async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)

        if (req.params.type) {
            await image.delete('categories', category.img)
        } else {
            const categories = await Category.find({parent_id: category._id})
            categories.forEach(async c => {
                await image.delete('categories', c.img)
                c.delete()
            })
        }

        await Category.deleteOne({_id: req.params.id})

        res.redirect('/admin/categories/index/'+req.params.type)
    } catch (e) {
        console.log(e)
    }
})

module.exports = router