const mongoose = require('mongoose');
const { Schema } = mongoose;

const client_schema = new Schema({
    id: { type: Number, unique: true },
    address: { type: String },
    email: { type: String, unique: true },
    name: { type: String },
    phone: { type: String },
});

module.exports = mongoose.model('Clients', client_schema)