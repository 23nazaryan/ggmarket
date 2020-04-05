const {Router} = require('express')
const router = new Router()
const layout = 'admin.main.hbs'

router.get('/', (req, res) => {
    res.render('admin/orders/index', {
        layout: layout,
    })
})

module.exports = router