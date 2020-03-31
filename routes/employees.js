const {Router} = require('express')
const Employee = require('../models/Employee')
router = new Router()

router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find({})
        res.render('employees', {
            title: 'Մեր աշխատակիցները',
            isEmployee: true,
            employees
        })
    } catch (e) {
        console.log(e)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id)
        res.render('employee', {
            title: employee.name,
            isEmployee: true,
            employee
        })
    } catch (e) {
        console.log(e)
    }
})

module.exports = router