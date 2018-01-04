const router 	    = require('express').Router()
const isLoggedIn    = require('../middleware/isLoggedIn')
const isAdmin       = require('../middleware/isAdmin')
const passport 	    = require('passport')
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

router.post('/signup', [isLoggedIn, isAdmin], passport.authenticate('local-signup', {
    successRedirect : '/admin/users', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true, // allow flash messages,
    session: false //avoid auto login
}));

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/login')
})


module.exports = router;