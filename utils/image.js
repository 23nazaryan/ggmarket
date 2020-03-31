const path = require('path')
const fs = require('fs')

module.exports.upload = (img, folder, imageName) => {
    img.mv(path.join(__dirname, '../public')+'/images/'+folder+'/'+imageName, (err) => {
        if (err) {
            throw err
        }
    })
}

module.exports.delete = (folder, imageName) => {
    const image = path.join(__dirname, '../public')+'/images/'+folder+'/'+imageName

    if (fs.existsSync(image)) {
        fs.unlink(image, (err) => {
            if (err) {
                throw err
            }
        })
    }
}