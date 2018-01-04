
module.exports = (req, res, next) => {

	if (req.user && req.user.isAdmin) 
		return next() 
    else 
    	res.redirect('/login')

}