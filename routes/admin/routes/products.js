const {Router} = require('express')
const auth = require('../../../middleware/auth')
const Product = require('../../../models/Product')
const Category = require('../../../models/Category')
const random = require('randomstring')
const image = require('../../../utils/image')
const router = new Router()
const layout = 'admin.main.hbs'

router.get('/index/:type?', auth, async (req, res) => {
    try {
        const categories = await Category.find({parent_id: {$ne: null}})
        let products

        if (req.params.type) {
            products = await Product.find({count: 0}).populate('category_id')
        } else {
            products = await Product.find({count: {$ne: 0}}).populate('category_id')
        }

        res.render('admin/products/index', {
            layout: layout,
            title: 'Ապրանքներ',
            isProducts: true,
            categories,
            categoryId: req.params.id,
            products
        })
    } catch (e) {
        console.log(e)
    }
})

router.get('/category/:id', auth, async (req, res) => {
    try {
        const categories = await Category.find({parent_id: {$ne: null}})
        let products

        if (req.params.id == 0) {
            products = await Product.find()
        } else {
            products = await Product.find({category_id: req.params.id})
        }

        res.render('admin/products/index', {
            layout: layout,
            title: 'Ապրանքներ',
            isProducts: true,
            categories,
            categoryId: req.params.id,
            products
        })
    } catch (e) {
        console.log(e)
    }
})

router.get('/create', auth, async (req, res) => {
    try {
        const categories = await Category.find({parent_id: {$ne: null}})

        res.render('admin/products/create', {
            layout: layout,
            title: 'Ավելացնել ապրանք',
            isProducts: true,
            action: '/admin/products/create',
            categories
        })
    } catch (e) {
        console.log(e)
    }
})

router.post('/create', auth, async (req, res) => {
    try {
        const {title, descr, price, is_sale, new_price, sale_type, count, is_top, keywords, category_id} = req.body
        let imageName = null

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.redirect('create')
        }

        const ext = '.'+req.files.img.mimetype.substring(6)
        imageName = random.generate(23)+ext
        await image.upload(req.files.img,'products', imageName)

        const product = new Product({
            title,
            descr,
            price,
            is_sale: is_sale || 0,
            new_price,
            sale_type,
            count,
            is_top: is_top || 0,
            keywords,
            category_id,
            img: imageName,
            types: req.body.types ? req.body.types.filter(Boolean) : null
        })

        await product.save()

        res.redirect('/admin/products/index')
    } catch (e) {
        console.log(e)
    }
})

router.get('/edit/:id', auth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        const categories = await Category.find({parent_id: {$ne: null}})

        res.render('admin/products/create', {
            layout: layout,
            title: product.title,
            isProducts: true,
            action: '/admin/products/edit/'+product._id,
            product,
            categories
        })
    } catch (e) {
        console.log(e)
    }
})

router.post('/edit/:id', auth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        let imageName = product.img

        if (req.files) {
            await image.delete('products', imageName)
            const ext = '.'+req.files.img.mimetype.substring(6)
            imageName = random.generate(23)+ext
            await image.upload(req.files.img,'products', imageName)
        }

        Object.assign(product, req.body)
        const is_top = req.body.is_top || 0
        const is_sale = req.body.is_sale || 0
        product.is_top = is_top
        product.is_sale = is_sale
        product.types = req.body.types ? req.body.types.filter(Boolean) : null
        product.img = imageName
        await product.save()

        res.redirect('/admin/products/index')
    } catch (e) {
        console.log(e)
    }
})

router.get('/delete/:id', auth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        await image.delete('products', product.img)
        product.delete()

        res.redirect('/admin/products/index')
    } catch (e) {
        console.log(e)
    }
})

module.exports = router