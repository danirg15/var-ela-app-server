const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs')

const UserSchema = mongoose.Schema({
	username: 	{ "type": String, "required": true, "unique": true },
	password: 	{ "type": String, "required": true },
	name: 		{ "type": String, "required": true },
	email: 		{ "type": String, "required": true },
	isAdmin: 	{ "type": Boolean, "default": false }
},{
	timestamps: true
});


UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}


//--------------------------------------------
//		Indexes
//--------------------------------------------
UserSchema.index({ "field": 1 });


//--------------------------------------------
//		Middlewares
//--------------------------------------------


module.exports = mongoose.model('User', UserSchema);