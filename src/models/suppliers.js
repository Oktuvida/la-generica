const mongoose = require('mongoose');
const { Schema } = mongoose;

const client_schema = new Schema({
    id: { type: Number, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
});

module.exports = mongoose.model('Clients', client_schema)