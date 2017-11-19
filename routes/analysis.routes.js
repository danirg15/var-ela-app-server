let router = require('express').Router()
let UserController = require('../controllers/UserController')
let validate = require('express-validation');
let validators = require('./validators');


router.post('/', validate(validators.analysis.full), (req, res) => {
	console.log(req.body)
	// UserController.store(req.body, (err) => {
	// 	if (err) res.status(500).json(err)
 //        else res.status(201).json({'message': 'Register successfuly'})
	// })
})


module.exports = router;