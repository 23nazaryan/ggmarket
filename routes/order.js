const {Router} = require('express')
const Order = require('../models/Order')
const {orderValidators} = require('../utils/validators')
const {validationResult} = require('express-validator/check')
const validatePhoneNumber = require('validate-phone-number-node-js');
const router = new Router()

router.post('/', orderValidators, async (req, res) => {
    try {
        let error
        const errors = validationResult(req)

        if (!validatePhoneNumber.validate(req.body.tel)) {
            error = 'Մուտքագրեք գործող հեռախոսահամար'
            req.flash('error', error)

            return res.status(422).redirect('/order')
        }

        if (!errors.isEmpty()) {
            error = errors.array()[0].msg
            req.flash('error', error)

            return res.status(422).redirect('/order')
        }

        const {tel, address, products} = req.body
        const order = new Order({
            tel,
            address,
            products
        })

        await order.save()
        req.flash('success', 'Ձեր պատվերը ընդունված է, սպասեք մեր զանգին:')

        res.redirect('/')
    } catch (e) {
        console.log(e)
    }
})

module.exports = router