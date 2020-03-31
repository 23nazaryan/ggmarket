const {Router} = require('express')
const auth = require('../../../middleware/auth')
const Client = require('../../../models/Client')
const Blacklist = require('../../../models/Blacklist')
const router = new Router()
const layout = 'admin.main.hbs'

router.get('/', auth, async (req, res) => {
    try {
        const clients = await Client.find({confirmed: 1}).populate('employee_id')

        res.render('admin/clients/index', {
            layout: layout,
            title: 'Հաճախորդներ',
            isClients: true,
            clients
        })
    } catch (e) {
        console.log(e)
    }
})

router.get('/:id/blacklist', auth, async (req, res) => {
    try {
        const client = await Client.findById(req.params.id)
        const blacklist = new Blacklist({
            tel: client.tel,
            email: client.email
        })
        await blacklist.save()
        await client.delete()

        res.redirect('/admin')
    } catch (e) {
        console.log(e)
    }
})

router.get('/:id/delete', auth, async (req, res) => {
    try {
        await Client.deleteOne({
            _id: req.params.id
        })

        res.redirect('/admin')
    } catch (e) {
        console.log(e)
    }
})

module.exports = router