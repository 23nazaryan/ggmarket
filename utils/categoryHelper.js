const Category = require('../models/Category')

const getCategories = async function()
{
    const data = await Category.find({parent_id: null})
    let categories = [];
    let i = 0;

    for (let item of data){
        categories[i] = []
        categories[i]['category'] = item
        let childs = await Category.find({parent_id: item._id})

        if (childs.length) {
            categories[i]['childs'] = childs
        }

        i++
    }

    return categories
}

module.exports.getCategories = getCategories