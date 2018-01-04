//--------------------------------------------
//		App Modules
//--------------------------------------------
const http =			require('http')
const express = 		require('express')
const app 	= 			express()
const bodyParser = 		require('body-parser')
const session = 		require('express-session')
const cookieParser = 	require('cookie-parser')
const env = 			require('dotenv').config()
const path = 			require('path')
const logger = 			require('morgan')
const config = 			require('config')
const moment_tz = 		require('moment-timezone')
const helmet = 			require('helmet')
const ejs =				require('ejs')
const flash = 			require('express-flash')
const passport = 		require('passport')

  
//--------------------------------------------
//		Middlewares
//--------------------------------------------
app.use(helmet())
app.use(cookieParser())
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({ secret: process.env.APP_KEY, resave: false, saveUninitialized: false }));
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.locals.moment = require('moment')

//Auth middlewares
const isLoggedIn = require('./middleware/isLoggedIn')
const isAdmin = require('./middleware/isAdmin')
const setupConfig = require('./middleware/setupConfig')

//--------------------------------------------
//		Configuration
//--------------------------------------------
const port = process.env.PORT || 3000

moment_tz.tz.setDefault(process.env.APP_TIME_ZONE || 'Europe/Madrid');


//Serve html
app.use(express.static('./client/assets'))
app.set('views', './client/views')
app.set('view engine', 'html')
app.engine('html', ejs.renderFile)

//--------------------------------------------
//		DB connection
//--------------------------------------------
require('./database').connect(config.DB_URI)


//--------------------------------------------
//		Routing
//--------------------------------------------

//Public routes
app.use(require('./routes/auth.routes'))

//Admin routes
app.use('/admin', [isLoggedIn, setupConfig, isAdmin], require('./routes/admin.routes')) 

//Private routes
app.get('/', [isLoggedIn, setupConfig], (req, res) => res.redirect('/analysis')) 
app.use('/analysis', [isLoggedIn, setupConfig], require('./routes/analysis.routes'))
app.use('/sites', [isLoggedIn, setupConfig], require('./routes/sites.routes'))
app.use('/data-server-connection', [isLoggedIn, setupConfig], require('./routes/data_server_connection.routes'))

//--------------------------------------------
//		Setup
//--------------------------------------------
const UserController = require('./controllers/UserController')
const ConfigController = require('./controllers/ConfigController')

UserController.createAdminUser((err) => { console.log(err) })
ConfigController.createDefaultConfig((err) => { console.log(err) })


//--------------------------------------------
//		Runnn!
//--------------------------------------------
const server = http.createServer(app)

server.listen(port, function(err) {
	if (err) throw err
	console.log('APP Server running on port: ' + port)
})


