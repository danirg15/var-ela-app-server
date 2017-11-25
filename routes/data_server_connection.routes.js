let router = require('express').Router()


router.get('/', (req, res) => {
	res.render('data_server_connection/index')
})


module.exports = router;