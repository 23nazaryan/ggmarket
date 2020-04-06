const {Schema, model} = require('mongoose')

const admin = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()}
})

admin.pre('save', function preSave(next){
    const admin = this
    admin.updatedAt = Date.now()
    next()
});

module.exports = model('Admin', admin)