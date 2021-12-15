const mongoose = require('mongoose');
const { Schema } = mongoose;

const consolidation_schema = new Schema({
    id: { type: Number, unique: true },
    city: { type: String, unique: true },
    total_sales: { type: Number }
});

module.exports = mongoose.model('Consolidation', consolidation_schema)