const keys = require('../keys')

module.exports = function ()
{
    return {
        to: keys.EMAIL_CONTACT,
        from: keys.EMAIL_FROM,
        subject: 'Նոր պատվեր',
        html: `<p>Դուք ունեք նոր պատվեր</p>`
    }
}