const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const roles = ["admin", "user"]

const role_schema = new Schema({
    name: String
}, {
    versionKey: false
});

module.exports = {
    model: model('Role', role_schema),
    roles
};
