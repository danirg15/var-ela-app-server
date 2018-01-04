
module.exports = (req, res, next) => {

	//Expose req data to EJS template
	res.locals.req = req

    if (req.isAuthenticated())
        return next()
    else 
    	res.redirect('/login')

}