const keys = require('../keys')

module.exports = function (email, key)
{
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Հերթագրման հաստատում',
        html: `<h1>Բարի գալուստ!</h1>
                <br>
                <p>Հերթագրումն ավարտելու համար, խնդրում ենք մուտքագրեք կոդը՝</p>
                <strong style="color: red">${key}</strong>
                <br>
                <br>
                <p>Հարգանքներով <a href="${keys.BASE_URL}">dent.am</a></p>`
    }
}