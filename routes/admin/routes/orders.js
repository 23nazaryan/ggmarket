const {Router} = require('express')
const auth = require('../../../middleware/auth')
const router = new Router()
const layout = 'admin.main.hbs'

router.get('/', auth, (req, res) => {
    res.render('admin/orders/index', {
        layout: layout,
    })
})

module.exports = router