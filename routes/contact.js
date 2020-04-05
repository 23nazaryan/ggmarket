const {Router} = require('express')
const About = require('../models/About')
const categoryHelper = require('../utils/categoryHelper')
const {contactValidators} = require('../utils/validators')
const {validationResult} = require('express-validator/check')
const nodemailer = require('nodemailer')
const contactEmail = require('../emails/contact')
const keys = require('../keys')
const router = new Router()

const transporter = nodemailer.createTransport({
    host: keys.EMAIL_HOST,
    port: keys.EMAIL_PORT,
    secure: true,
    auth: {
        user: keys.EMAIL_AUTH_USER,
        pass: keys.EMAIL_AUTH_PASS
    }
});

router.get('/', async (req, res) => {
    try {
        const categories = await categoryHelper.getCategories()
        const about = await About.findOne()

        res.render('contact', {
            title: 'Հետադարձ կապ',
            isContact: true,
            error: req.flash('error'),
            success: req.flash('success'),
            categories,
            about
        })
    } catch (e) {
        console.log(e)
    }

})

router.post('/', contactValidators, async (req, res) => {
    try {
        let error = ''
        const {email, message} = req.body
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            error = errors.array()[0].msg
        } else {
            transporter.sendMail(contactEmail(email, message))
            req.flash('success', 'Շնորհակալություն մեր հետ կապնվելու համար։ Շուտով մենք կպատասխանենք Ձեզ։')

            return res.status(200).redirect('/contact')
        }

        req.flash('error', error)

        return res.status(422).redirect('/contact')
    } catch (e) {
        console.log(e)
    }
})

module.exports = router