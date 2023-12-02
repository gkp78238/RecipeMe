const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    my_recipes: {
        type: Array,
        default: [],
    },
    auth_token: {
        type: String,
        default: '',
    },
    updated_date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Account = mongoose.model('account', AccountSchema)