const axios = require('axios')
let router = require('express').Router()
const validate = require('express-validation');
const validators = require('./validators');
const data_server_endpoint = process.env.DATA_SERVER_API_ENDPOINT

router.get('/', (req, res) => {
	axios.get(data_server_endpoint+'/api/analysis')
	  .then(function (response) {
	    res.render('analysis/index', {'analyses': response.data})
	  })
	  .catch(function (error) {
	  	req.flash('status', 'error')
	  	req.flash('info', 'Cannot retrieve analyses from data server. Check connection.')
	    res.render('analysis/index', {'analyses': []})
	  });
})

router.get('/:id/report', (req, res) => {
	res.render('analysis/report')
})

router.get('/create', (req, res) => {
	res.render('analysis/form')
})

router.post('/create', validate(validators.analysis.full), (req, res) => {
	let data = {
		'title': req.body.title,
		'description': req.body.description,
		'author': 'Daniel Ramirez',
		'config': req.body
	}

	axios.post(data_server_endpoint+'/api/analysis', data)
	  .then(function (response) {
	  	req.flash('status', 'success')
	  	req.flash('info', 'Analysis submitted successfully')
	    res.redirect('/')
	  })
	  .catch(function (error) {
	  	req.flash('status', 'error')
	  	req.flash('info', 'Something went wrong while creating the new analysis. ' + error)
	    res.redirect('/')
	  });
})


module.exports = router;