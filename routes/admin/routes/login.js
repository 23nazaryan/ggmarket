const {Router} = require('express')
const bcrypt = require('bcryptjs')
const Admin = require('../../../models/Admin')
const router = new Router()

router.get('/', (req, res) => {
    if (req.session.isAuth) {
        return res.redirect('/admin/orders')
    }

    return res.render('admin/login', {
        layout: false,
        title: 'Admin panel'
    })
})

router.post('/', async (req, res) => {
    try {
        const {login, password} = req.body
        const candidate = await Admin.findOne({login})

        if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.password)

            if (areSame) {
                req.session.admin = candidate
                req.session.isAuth = true
                req.session.save(err => {
                    if (err) {
                        throw err
                    }

                    res.redirect('/admin')
                })
            } else {
                res.redirect('/admin/login')
            }
        } else {
            res.redirect('/admin/login')
        }
    } catch (e) {
        console.log(e)
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy()

    res.redirect('/admin/login')
})

module.exports = router