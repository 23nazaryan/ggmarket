const {Router} = require('express')
const router = new Router()

router.get('/', (req, res) => {
    res.render('about', {
        title: 'Մեր մասին',
        isAbout: true
    })
})

module.exports = router