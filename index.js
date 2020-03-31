const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')
const csrf = require('csurf')
const flash = require('connect-flash')
const session = require('express-session')
const helmet = require('helmet')
const MongoStore = require('connect-mongodb-session')(session)
const path = require('path')
const homeRoutes = require('./routes/home')
const servicesRoutes = require('./routes/services')
const employeesRoutes = require('./routes/employees')
const aboutRoutes = require('./routes/about')
const registerRoutes = require('./routes/register')
const adminRoutes = require('./routes/admin')
const varMiddleware = require('./middleware/variables')
const errorHandler = require('./middleware/error')
const keys = require('./keys/index')
const app = express()

const PORT = process.env.PORT || 3000

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
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
app.use(varMiddleware)
app.use('', homeRoutes)
app.use('/services', servicesRoutes)
app.use('/employees', employeesRoutes)
app.use('/about', aboutRoutes)
app.use('/register', registerRoutes)
//admin
app.use('/admin', adminRoutes.clients)
app.use('/admin/login', adminRoutes.login)
app.use('/admin/services', adminRoutes.services)
app.use('/admin/employees', adminRoutes.employees)
app.use('/admin/blacklist', adminRoutes.blacklist)

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