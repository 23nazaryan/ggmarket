const {body} = require('express-validator/check')

exports.contactValidators = [
    body('message', ).isLength({min: 1}).withMessage('Մուտքագրեք նամակ').trim(),
    body('email', ).isLength({min: 1}).withMessage('Մուտքագրեք էլ․ հասցե').trim().normalizeEmail(),
    body('email').isEmail().withMessage('Մուտքագրեք գործող էլ․ հասցե'),
]

exports.orderValidators = [
    body('tel', ).isLength({max: 9}).withMessage('Մուտքագրեք գործող հեռախոսահամար').trim(),
    body('address', ).isLength({min: 1}).withMessage('Մուտքագրեք հասցե').trim()
]