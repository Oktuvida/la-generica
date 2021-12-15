const mongoose = require('mongoose');
const { Schema } = mongoose;

const sale_details_schema = new Schema({
    number_products: { type: Number },
    product_code: { type: Number, unique: true },
    vat_value: { type: Number },
    total_value: { type: Number },
    sale_value: { type: Number },
});

module.exports = mongoose.model('SaleDetails', sale_details_schema)