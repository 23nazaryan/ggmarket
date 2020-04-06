const {Router} = require('express')
const Order = require('../../../models/Order')
const auth = require('../../../middleware/auth')
const router = new Router()
const layout = 'admin.main.hbs'

router.get('/', auth, (req, res) => {
    try {
        const orders = Order.find({status: 0})

        res.render('admin/orders/index', {
            layout: layout,
            isOrders: true,
            orders
        })
    } catch (e) {
        console.log(e)
    }
})

module.exports = router