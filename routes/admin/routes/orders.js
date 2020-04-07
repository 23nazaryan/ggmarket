const {Router} = require('express')
const Order = require('../../../models/Order')
const auth = require('../../../middleware/auth')
const router = new Router()
const layout = 'admin.main.hbs'

router.get('/', auth, async (req, res) => {
    try {
        const orders = await Order.find({status: 0})

        res.render('admin/orders/index', {
            layout: layout,
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
        order.products.forEach(async (p) => {
            
        })

        return true

    } catch (e) {
        console.log(e)
    }
})

router.get('/delete/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        order.delete()

        res.redirect('/admin/orders')
    } catch (e) {
        console.log(e)
    }
})

module.exports = router