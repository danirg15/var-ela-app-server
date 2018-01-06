const router = require('express').Router()
const axios = require('axios')
const ConfigController = require('../controllers/ConfigController')

router.get('/', (req, res) => {
	ConfigController.get((err, config) => {
		res.render('data_server_connection/index', {'config': config})
	})
})

router.post('/update', (req, res) => {
	ConfigController.update(req.body, (err) => {
		if(err) {
			req.flash('status', 'error')
			req.flash('info', 'Something went wrong1')
			res.redirect('/data-server-connection')
		}
		else {
			req.flash('status', 'success')
			req.flash('info', 'Configuration updated')
			res.redirect('/data-server-connection')
		}
	})
})


router.get('/test-connection', (req, res) => {
	const sendDate = (new Date()).getTime()

	axios.head(req.data_server_endpoint)
	  .then(function (response) {
	  	const receiveDate = (new Date()).getTime()
	  	const responseTimeMs = receiveDate - sendDate

	    req.flash('status', 'success')
	    req.flash('info', 'Success - response: ' + responseTimeMs + 'ms')
	    res.redirect('/data-server-connection')
	  })
	  .catch(function (error) {
	  		req.flash('status', 'error')
	  		req.flash('info', 'Error: ' + error)
	  		res.redirect('/data-server-connection')
	  })
})

module.exports = router;