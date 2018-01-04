const router 			= require('express').Router()
const passport 			= require('passport')
require('../config/passport_local')(passport)


router.get('/login', (req, res) => {
	res.render('auth/login.html')
})

router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}))

router.get('/signup', (req, res) => {
	res.render('auth/signup.html')
})

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/login')
})


module.exports = router;