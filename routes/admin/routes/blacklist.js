const {Router} = require('express')
const auth = require('../../../middleware/auth')
const Blacklist = require('../../../models/Blacklist')
const router = new Router()
const layout = 'admin.main.hbs'

router.get('/', auth, async (req, res) => {
    try {
        const blacklist = await Blacklist.find()

        res.render('admin/blacklist/index', {
            layout: 'admin.main.hbs',
            title: 'Սև ցուցակ',
            isBlacklist: true,
            blacklist
        })
    } catch (e) {
        console.log(e)
    }
})

router.get('/create', auth, (req, res) => {
    res.render('admin/blacklist/create', {
        layout: layout,
        title: 'Ավելացնել սև ցուցակում',
        isBlacklist: true,
        action: 'create'
    })
})

router.post('/create', auth, async (req, res) => {
    try {
        const {tel, email} = req.body
        const blacklist = new Blacklist({
            tel, email
        })
        await blacklist.save()

        res.redirect('/admin/blacklist')
    } catch (e) {
        console.log(e)
    }
})

router.get('/:id/edit', auth, async (req, res) => {
    try {
        const blacklist = await Blacklist.findById(req.params.id)

        res.render('admin/blacklist/create', {
            layout: layout,
            title: 'Փոխել սև ցուցակի տվյալները',
            isBlacklist: true,
            action: 'edit',
            blacklist
        })
    } catch (e) {
        console.log(e)
    }
})

router.post('/:id/edit', auth, async (req, res) => {
    try {
        const blacklist = await Blacklist.findById(req.params.id)
        Object.assign(blacklist, req.body)
        await blacklist.save()

        res.redirect('/admin/blacklist')
    } catch (e) {
        console.log(e)
    }
})

router.get('/:id/delete', auth, async (req, res) => {
    try {
        await Blacklist.deleteOne({
            _id: req.params.id
        })

        res.redirect('/admin/blacklist')
    } catch (e) {
        console.log(e)
    }
})

module.exports = router