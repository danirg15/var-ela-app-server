const ConfigController = require('../controllers/ConfigController')

module.exports = (req, res, next) => {
	//Expose req data to EJS template
	res.locals.req = req

	ConfigController.get((err, config) => {
		//We make available the config in the next request in order to know
		//data server connection params
		req.data_server_endpoint = config.host +':'+ config.port + '?key=' + config.key
		console.log(req.data_server_endpoint) 
	    return next()
	})

}