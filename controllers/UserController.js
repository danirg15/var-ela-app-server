const User = require('../models/user')

module.exports = {

    getAll: (options, callback) => {
        User.find(options, callback)
    },

    getOne: (callback) => {
        User.findById(req.params.id, callback)
    },

    store: (user, callback) => {
        (new User(user)).save(callback)
    }, 

    update: (user_id, fields, callback) => {
        User.findByIdAndUpdate(user_id, fields, callback)
    },

    destroy: (user_id, callback) => {
        User.findByIdAndRemove(user_id, callback)
    },

    count: (options, callback) => {
        User.count(options, callback)
    },

    createAdminUser: (callback) => {

        User.findOne({'username': 'admin'}, (err, user) => {
            if (err) {
                throw err
            }
            else if (!user) {
                let newUser = new User()
                newUser.name = 'Admin'
                newUser.email = 'admin@admin.com'
                newUser.username = 'admin'
                newUser.password = newUser.generateHash('admin')
                newUser.isAdmin = true

                newUser.save(callback)
            }
        })
    }


};

