const {Router} = require('express')
const Order = require('../../../models/Order')
const Product = require('../../../models/Product')
const auth = require('../../../middleware/auth')
const router = new Router()
const layout = 'admin.main.hbs'

router.get('/', auth, async (req, res) => {
    try {
        const orders = await Order.find({status: 0})

        res.render('admin/orders/index', {
            layout: layout,
            title: 'Նոր պատվերներ',
            isOrders: true,
            orders
        })
    } catch (e) {
        console.log(e)
    }
})

router.get('/view/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        const status = (order.status) ? (order.status === 1) ? 'Հաստատված' : 'Չեղարկված' : 'Նոր'

        res.render('admin/orders/view', {
            layout: layout,
            title: 'Պատվեր',
            isOrders: true,
            order,
            status
        })
    } catch (e) {
        console.log(e)
    }
})

router.get('/confirmed', auth, async (req, res) => {
    try {
        const orders = await Order.find({status: 1})

        res.render('admin/orders/index', {
            layout: layout,
            title: 'Հաստատված',
            isOrders: true,
            orders
        })
    } catch (e) {
        console.log(e)
    }
})

router.get('/confirm/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)

        for (item of order.products) {
            let product = await Product.findById(item.id)

            if (product) {
                product.count -= item.count
                await product.save()
            }
        }

        order.status = 1
        await order.save()

        res.redirect('/admin/confirmed')
    } catch (e) {
        console.log(e)
    }
})

router.get('/cancelled', auth, async (req, res) => {
    try {
        const orders = await Order.find({status: 2})

        res.render('admin/orders/index', {
            layout: layout,
            title: 'Չեղարկված',
            isOrders: true,
            orders
        })
    } catch (e) {
        console.log(e)
    }
})

router.get('/cancel/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        order.status = 2
        await order.save()

        res.redirect('/admin/cancelled')
    } catch (e) {
        console.log(e)
    }
})

router.get('/delete/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        order.delete()

        res.redirect('/admin')
    } catch (e) {
        console.log(e)
    }
})

module.exports = router