let router = require('express').Router()
let UserController = require('../controllers/UserController')
let validate = require('express-validation');
let validators = require('./validators');

router.get('/', (req, res) => {
	res.render('analysis/index')
})

router.get('/:id/report', (req, res) => {
	res.render('analysis/report')
})

router.get('/create', (req, res) => {
	res.render('analysis/form')
})

router.post('/create', validate(validators.analysis.full), (req, res) => {
	console.log(req.body)
	// UserController.store(req.body, (err) => {
	// 	if (err) res.status(500).json(err)
 //        else res.status(201).json({'message': 'Register successfuly'})
	// })
})


module.exports = router;