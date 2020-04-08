const keys = require('../keys')

module.exports = function (email, message)
{
    return {
        to: '23vahe@rambler.ru',
        from: 'vahe000@inbox.ru',
        subject: 'Հետադարձ կապ',
        html: `<h1>Օգտատեր։
                <br>${email}</h1>
                <br>
                <p>${message}</p>`
    }
}