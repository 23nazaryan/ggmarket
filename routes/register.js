const {Router} = require('express')
const Employee = require('../models/Employee')
const Client = require('../models/Client')
const Blacklist = require('../models/Blacklist')
const {registerValidators} = require('../utils/validators')
const {validationResult} = require('express-validator/check')
const nodemailer = require('nodemailer')
const regEmail = require('../emails/register')
const keys = require('../keys')
const router = new Router

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
    const employees = await Employee.find({})
    res.render('register', {
        title: 'Հերթագրվել',
        isReg: true,
        error: req.flash('error'),
        employees
    })
})

router.post('/', registerValidators, async (req, res) => {
    try {
        let error = ''
        const {name, surname, age, tel, email, employee_id, date} = req.body
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            error = errors.array()[0].msg
        } else {
            const blacklist = await Blacklist.findOne({$or: [{"tel": tel}, {"email": email}]})

            if (!blacklist) {
                const key = Math.random().toString(36).substring(7);
                const client = new Client({
                    key,
                    name,
                    surname,
                    age,
                    tel,
                    email,
                    employee_id,
                    date
                })
                const send = await transporter.sendMail(regEmail(email, key))

                if (send.response.includes('OK')) {
                    await client.save()

                    return res.render('verification', {
                        title: 'Հերթագրման հաստատում',
                        isReg: true,
                        client
                    })
                } else {
                    error = 'Ձեր կողմից մուտքագրված էլ․ փոստը չի գործում'
                }
            } else {
                error = 'Դուք չեք կարող հերթագրվել, քանի որ գտնվում եք սև ցուցակում'
            }
        }

        req.flash('error', error)

        return res.status(422).redirect('/register')
    } catch (e) {
        console.log(e)
    }
})

router.post('/verification', async (req, res) => {
    try {
        const {id, key} = req.body
        const client = await Client.findById(id)

        if (client.key === key) {
            client.confirmed = 1
            await client.save()
            res.render('verification', {
                title: 'Հերթագրման հաստատում',
                isReg: true,
                success: 'Դուք հաջողությամբ հերթագրվեցիք մեր կլինիկայում'
            })
        } else {
            res.render('verification', {
                title: 'Հերթագրման հաստատում',
                isReg: true,
                error: 'Դուք սխալ եք մուտքագրել կոդը',
                client
            })
        }
    } catch (e) {
        console.log(e)
    }
})

router.post('/change-employee', async (req, res) => {
    let times = ['09:00','09:30','10:00','10:30','11:00','11:30','12:00',
        '12:30','13:00','13:30','14:00','14:30','15:00','15:30',
        '16:00','16:30','17:00','17:30','18:00']
    const date = new Date()
    const minute = date.getMinutes()
    let start = ''
    let hour = date.getHours() + 1

    if (minute < '15') {
        start = date.getHours()+':30'
    } else if (minute >= '15' && minute < '45') {
        start = hour + ':00'
    } else if (minute >= '45') {
        start = hour + ':30'
    }

    let unset = []

    for (let i = 0; i < times.length; i++) {
        if (start == times[i]) {
            for (let j = 0; j < i; j++) {
                unset.push(times[j])
            }
        }
    }

    const todays = times.filter(x => !unset.includes(x))
    let dateTime = []

    function getDateTime(time, date, day)
    {
        for (let i = 0; i < time.length; i++) {
            dateTime.push(`Օր - ${date.getFullYear()} / ${date.getMonth() + 1} / ${date.getDate() + day} Ժամ - ${time[i]}`)
        }
    }

    for (let day = 0; day < 7; day++) {
        if (day === 0 ) {
            getDateTime(todays, date, day)
        } else {
            getDateTime(times, date, day)
        }
    }

    const id = req.body.id
    const clients = await Client.find({"employee_id": id})
    let busyDates = [];

    clients.forEach(function(client) {
        busyDates.push(client.date)
    });

    const freeDays = dateTime.filter(x => !busyDates.includes(x))
    res.status(200).json(freeDays)
})

module.exports = router