const {body} = require('express-validator/check')

exports.registerValidators = [
    body('name', ).isLength({min: 1}).withMessage('Մուտքագրեք անուն').trim(),
    body('surname', ).isLength({min: 1}).withMessage('Մուտքագրեք ազգանուն').trim(),
    body('age', ).isLength({min: 1}).withMessage('Մուտքագրեք տարիք').trim(),
    body('age').isNumeric().withMessage('Մուտքագրեք կոռռեկտ տարիք'),
    body('tel', ).isLength({min: 1}).withMessage('Մուտքագրեք հեռախոսահամար').trim(),
    body('tel', ).isLength({min: 8}).withMessage('Մուտքագրեք կոռռեկտ հեռախոսահամար'),
    body('tel', ).isLength({max: 9}).withMessage('Մուտքագրեք կոռռեկտ հեռախոսահամար'),
    body('email', ).isLength({min: 1}).withMessage('Մուտքագրեք էլ․ հասցե').trim().normalizeEmail(),
    body('email').isEmail().withMessage('Մուտքագրեք գործող էլ․ հասցե'),
    body('employee_id', ).isLength({min: 1}).withMessage('Ընտրեք բժիշկ'),
    body('date', ).isLength({min: 1}).withMessage('Ընտրեք ամսաթիվ')
]