const mongoose = require('mongoose');

const ConfigSchema = mongoose.Schema({
	host: 	{ "type": String, "required": true },
	port: 	{ "type": Number, "required": true },
	key: 	{ "type": String, "required": true },
});




//--------------------------------------------
//		Indexes
//--------------------------------------------


//--------------------------------------------
//		Middlewares
//--------------------------------------------


module.exports = mongoose.model('Config', ConfigSchema);