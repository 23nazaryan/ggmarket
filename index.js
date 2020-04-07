const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')
const csrf = require('csurf')
const flash = require('connect-flash')
const session = require('express-session')
const helmet = require('helmet')
const compression = require('compression')
const MongoStore = require('connect-mongodb-session')(session)
const path = require('path')
const homeRoutes = require('./routes/home')
const productRoutes = require('./routes/product')
const productsRoutes = require('./routes/products')
const salesRoutes = require('./routes/sales')
const searchRoutes = require('./routes/search')
const aboutRoutes = require('./routes/about')
const contactRoutes = require('./routes/contact')
const buyingRoutes = require('./routes/buying')
const cartRoutes = require('./routes/cart')
const orderRoutes = require('./routes/order')
const adminRoutes = require('./routes/admin')
const varMiddleware = require('./middleware/variables')
const errorHandler = require('./middleware/error')
const keys = require('./keys/index')
const app = express()

const PORT = process.env.PORT || 3000

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: {
        ifOr: function (v1, v2, options) {
            if (v1 || v2) return options.fn(this)
            return options.inverse(this)
        },
        ifAnd: function (v1, v2, options) {
            if (v1 && v2) return options.fn(this)
            return options.inverse(this)
        },
        ifEquals: function (v1, v2, v3, options) {
            if (v1 === v2 || v1 === v3) return options.fn(this)
            return options.inverse(this)
        },
        paginate: require('handlebars-paginate')
    }
})

const store = new MongoStore({
    collection: 'sessions',
    uri: keys.MONGODB_URI
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}))

app.use(bodyParser.json())
app.use(fileUpload());
app.use(csrf())
app.use(flash())
app.use(helmet())
app.use(compression())
app.use(varMiddleware)
app.use('', homeRoutes)
app.use('/products', productsRoutes)
app.use('/product', productRoutes)
app.use('/sales', salesRoutes)
app.use('/search', searchRoutes)
app.use('/about', aboutRoutes)
app.use('/contact', contactRoutes)
app.use('/buying', buyingRoutes)
app.use('/cart', cartRoutes)
app.use('/order', orderRoutes)

//admin
app.use('/admin/orders', adminRoutes.orders)
app.use('/admin/login', adminRoutes.login)
app.use('/admin/categories', adminRoutes.categories)
app.use('/admin/about', adminRoutes.about)
app.use('/admin/products', adminRoutes.products)

app.use(errorHandler)

async function start()
{
    try {
        await mongoose.connect(
            keys.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        )
        app.listen(PORT, () => {
            console.log('Server is running')
        })
    } catch (e) {
        console.log(e)
    }
}

start()