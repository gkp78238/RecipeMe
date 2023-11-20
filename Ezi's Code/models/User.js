const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        //required: true
    },
    password: {
        type: String,
    },
    my_recipes: {
        type: Array,
    },
    auth_token: {
        type: String,
    },
    updated_date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = User = mongoose.model('user', UserSchema)