const Joi = require('joi');
 
//.allow('')

module.exports = {
	full: {
		  body: {
		    'title':       		Joi.string().required(),
		    'description':    	Joi.string().optional(),
		    'min-mean-dp':   	Joi.number().optional(),
		    'max-mean-dp':   	Joi.string().optional(),
		    'remove-non-passing-sites': Joi.boolean().optional(),
		    'keep-only-indels': Joi.boolean().optional(),
		    'min-quality': 		Joi.string().optional()
		  }
	}
}