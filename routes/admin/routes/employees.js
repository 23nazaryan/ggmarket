const {Router} = require('express')
const Employee = require('../../../models/Employee')
const auth = require('../../../middleware/auth')
const path = require('path')
const fs = require('fs')
const image = require('../../../utils/image')
const router = new Router()
const layout = 'admin.main.hbs'

router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find()

        res.render('admin/employees/index', {
            layout: layout,
            title: 'Աշխատակիցներ',
            isEmployees: true,
            employees
        })
    } catch (e) {
        console.log(e)
    }
})

router.get('/create', auth, (req, res) => {
    res.render('admin/employees/create', {
        layout: layout,
        title: 'Ավելացնել աշխատակից',
        isEmployees: true,
        action: 'create'
    })
})

router.post('/create', auth, async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.redirect('/admin/employees/create')
        }

        const {name, biography, position} = req.body
        const employee = new Employee({
            name, biography, position
        })
        await employee.save()
        const imageName = employee._id+'.jpg'
        await image.upload(req.files.img,'employees', imageName)

        res.redirect('/admin/employees')
    } catch (e) {
        console.log(e)
    }
})

router.get('/:id/edit', auth, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id)
        const file = path.join(__dirname, '../../../public')+'/images/employees/'+employee._id+'.jpg'
        let image = false

        if (fs.existsSync(file)) {
            image = true
        }

        res.render('admin/employees/create', {
            layout: layout,
            title: 'Փոխել աշխատակցի տվյալները',
            isEmployees: true,
            action: 'edit',
            image,
            employee
        })
    } catch (e) {
        console.log(e)
    }
})

router.post('/:id/edit', auth, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id)
        Object.assign(employee, req.body)
        await employee.save()

        if (req.files) {
            const imageName = employee._id+'.jpg'
            await image.delete('employees', imageName)
            await image.upload(req.files.img,'employees', imageName)
        }

        res.redirect('/admin/employees')
    } catch (e) {
        console.log(e)
    }
})

router.get('/:id/delete', auth, async (req, res) => {
    try {
        await Employee.deleteOne({
            _id: req.params.id
        })
        const imageName = req.params.id+'.jpg'
        await image.delete('employees', imageName)

        res.redirect('/admin/employees')
    } catch (e) {
        console.log(e)
    }
})

module.exports = router