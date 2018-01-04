const router = require('express').Router()
const ConfigController = require('../controllers/ConfigController')

router.get('/', (req, res) => {
	ConfigController.get((err, config) => {
		res.render('data_server_connection/index', {'config': config})
	})
})

router.post('/update', (req, res) => {
	ConfigController.update(req.body, (err) => {
		if(err) {
			throw err
		}
		else {
			res.redirect('/data-server-connection')
		}
	})
})

module.exports = router;