const Category = require('../models/Category')

const getCategories = async function()
{
    const data = await Category.find({parent_id: null}).select(['id', 'title'])
    let categories = [];
    let i = 0;

    for (let item of data){
        categories[i] = []
        categories[i]['category'] = item
        let childs = await Category.find({parent_id: item._id}).select(['id', 'title'])

        if (childs.length) {
            categories[i]['childs'] = childs
        }

        i++
    }

    return categories
}

const forSliders = async function()
{
    return await Category.find({for_slider: 1, parent_id: {$ne: null}}).select(['_id', 'title', 'img']).limit(10).sort([['views', 'descending']])
}

module.exports.getCategories = getCategories
module.exports.forSliders = forSliders