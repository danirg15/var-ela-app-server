const Config = require('../models/config')

module.exports = {

    get: (callback) => {
        Config.findOne({}, callback)
    },

    update: (fields, callback) => {
        Config.findOneAndUpdate({}, fields, callback)
    },


    createDefaultConfig: (callback) => {

        Config.findOne({}, (err, config) => {
            if (err) {
                throw err
            }
            else if (!config) {
                let newConfig = new Config()
                newConfig.host = 'http://localhost'
                newConfig.port = '5000'
                newConfig.key = '123'
               
                newConfig.save(callback)
            }
        })
    }


};

