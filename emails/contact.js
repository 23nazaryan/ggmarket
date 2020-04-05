const keys = require('../keys')

module.exports = function (email, message)
{
    return {
        to: keys.EMAIL_CONTACT,
        from: keys.EMAIL_FROM,
        subject: 'Հետադարձ կապ',
        html: `<h1>Օգտատեր։<br>${email}</h1>
                <br>
                <p>${message}</p>`
    }
}