const {Router} = require('express')
const Order = require('../../../models/Order')
const Product = require('../../../models/Product')
const phantom = require('phantom')
const dateformat = require('dateformat')
const random = require('randomstring')
const keys = require('../../../keys')
const path = require('path')
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

router.get('/view/:id', auth, async (req, res) => {
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

router.get('/confirm/:id', auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)

        for (let item of order.products) {
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

router.get('/cancel/:id', auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        order.status = 2
        await order.save()

        res.redirect('/admin/cancelled')
    } catch (e) {
        console.log(e)
    }
})

router.get('/delete/:id', auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        order.delete()

        res.redirect('/admin')
    } catch (e) {
        console.log(e)
    }
})

router.get('/for-print/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        const delivery = 300
        const amount = parseInt(order.amount) + delivery
        const date = dateformat(new Date(), "HH:MM dd-mm-yyyy", "Asia/Yerevan")

        res.render('admin/orders/for-print', {
            layout: false,
            title: 'Պատվեր',
            order,
            amount,
            delivery,
            date
        })
    } catch (e) {
        console.log(e)
    }
})

router.get('/print/:id', auth, async (req, res) => {
    try {
        const url = keys.BASE_URL+'/admin/for-print/'+req.params.id
        const name = random.generate(10)+'.pdf'
        const file = path.join(__dirname, '../../../public/pdf/'+name)

        phantom.create().then(function(ph) {
            ph.createPage().then(function(page) {
                page.open(url).then(function() {
                    page.render(file).then(async function() {
                        res.download(file);
                        ph.exit();
                    });
                });
            });
        });

        return true
    } catch (e) {
        console.log(e)
    }
})

module.exports = router