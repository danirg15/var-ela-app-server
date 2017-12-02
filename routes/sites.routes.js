const axios = require('axios')
let router = require('express').Router()
const validate = require('express-validation');
const validators = require('./validators');
const data_server_endpoint = process.env.DATA_SERVER_API_ENDPOINT

router.get('/', (req, res) => {
	axios.get(data_server_endpoint+'/api/sites', {'params': req.query})
	  .then(function (response) {
	    res.render('sites/list', {'sites': response.data})
	  })
	  .catch(function (error) {
	  	req.flash('status', 'error')
	  	req.flash('info', 'Cannot retrieve sites from data server. Check out connection.')
	    res.render('sites/list', {'sites': []})
	  });
})


router.get('/detail/:id', (req, res) => {
	axios.get(data_server_endpoint+'/api/sites/'+req.params.id)
	  .then(function (response) {
	    res.render('sites/detail', {'site': response.data})
	  })
	  .catch(function (error) {
	  	alert('Error: ' + error)
	  });
})


module.exports = router;