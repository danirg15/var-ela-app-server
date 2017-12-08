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
	  	req.flash('info', 'Cannot retrieve analyses from data server. Check out connection.')
	    res.render('analysis/index', {'analyses': []})
	  });
})

router.get('/:id/report', (req, res) => {

	axios.get(data_server_endpoint+'/api/analysis/'+req.params.id)
	  .then(function (response) {
	    res.render('analysis/report', {
	    	'analysis': response.data,
	    	'data_server_endpoint': data_server_endpoint
	    })
	  })
	  .catch(function (error) {
	  	req.flash('status', 'error')
	  	req.flash('info', 'Cannot retrieve analysis from data server. Check out connection.')
	    res.render('analysis/index', {'analyses': []})
	  });

})


router.get('/create', (req, res) => {
	res.render('analysis/form-analysis-config')
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
	  	req.flash('info', 'Analysis configuration saved successfully')
	    res.redirect('/analysis/'+ response.data.obj._id +'/select-files')
	  })
	  .catch(function (error) {
	  	req.flash('status', 'error')
	  	req.flash('info', 'Something went wrong while creating the new analysis. ' + error)
	    res.redirect('/')
	  });
})



router.get('/:id/select-files', (req, res) => {
	axios.get(data_server_endpoint+'/api/fs/explore', {'params': req.query})
	  .then(function (response) {
	  	res.render('analysis/form-select-files', {
	  		'listing': response.data,
	  		'query': req.query,
	  		'analysis_id': req.params.id
	  	})
	  })
	  .catch(function (error) {
	  	req.flash('status', 'error')
	  	req.flash('info', 'Cannot retrieve files from data server. Check out connection.')
	    res.redirect('/')
	  });
})


router.post('/:id/select-files', validate(validators.analysis.select_files), (req, res) => {
	axios.post(data_server_endpoint+'/api/analysis/'+req.params.id+'/input-files', req.body)
	  .then(function (response) {
	  	req.flash('status', 'success')
	  	req.flash('info', 'Analysis saved successfully and queued.')
	    res.redirect('/')
	  })
	  .catch(function (error) {
	  	req.flash('status', 'error')
	  	req.flash('info', 'Something went wrong while submitting the files. ' + error)
	    res.redirect('/')
	  });
})


module.exports = router;