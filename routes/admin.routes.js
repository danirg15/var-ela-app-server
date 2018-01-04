const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.get('/users', (req, res) => {
	UserController.getAll({}, (err, users) => {
		res.render('admin/users', {'users': users})
	})	
})

router.get('/users/create', (req, res) => {
	res.render('admin/form-user')
})

router.get('/users/:id/remove', (req, res) => {
	UserController.destroy(req.params.id, (err) => {
		req.flash('status', 'success')
		req.flash('info', 'User succesfully removed')
		res.redirect('/admin/users')
	})	
})


module.exports = router;