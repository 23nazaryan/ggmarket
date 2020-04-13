const {Router} = require('express')
const Order = require('../models/Order')
const {orderValidators} = require('../utils/validators')
const {validationResult} = require('express-validator')
const validatePhoneNumber = require('validate-phone-number-node-js');
const nodemailer = require('nodemailer')
const orderMessage = require('../emails/order')
const keys = require('../keys')
const router = new Router()

const transporter = nodemailer.createTransport({
    host: keys.EMAIL_HOST,
    port: keys.EMAIL_PORT,
    secure: true,
    auth: {
        user: keys.EMAIL_FROM,
        pass: keys.EMAIL_PASS
    }
});

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
        let amount = 0

        for (let product of products) {
            amount += parseInt(product.amount)
        }

        const order = new Order({
            tel,
            address,
            products,
            amount
        })

        transporter.sendMail(orderMessage())
        await order.save()
        req.flash('success', 'Ձեր պատվերը ընդունված է, սպասեք մեր զանգին:')

        res.redirect('/')
    } catch (e) {
        console.log(e)
    }
})

module.exports = router