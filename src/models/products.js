const mongoose = require('mongoose');
const { Schema } = mongoose;

const product_schema = new Schema({
    product_code: { type: Number, unique: true },
    vat_sale: { type: Number },
    supplier_nit: { type: Number },
    product_name: { type: String },
    purchase_price: { type: Number },
    selling_price: { type: Number }
});

module.exports = mongoose.model('Products', product_schema)