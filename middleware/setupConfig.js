const ConfigController = require('../controllers/ConfigController')
const axios = require('axios')

module.exports = (req, res, next) => {
	//Expose req data to EJS template
	res.locals.req = req

	ConfigController.get((err, config) => {
		//We make available the config in the next request in order to know
		//data server connection params
		req.data_server_endpoint = config.host +':'+ config.port

		//We asign to axios objetct the auth header, so its used in every request
		axios.defaults.headers.common['api_key'] = config.key

	    return next()
	})

}