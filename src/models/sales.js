const mongoose = require('mongoose');
const { Schema } = mongoose;

const sale_schema = new Schema({
    customer_id: { type: Number },
    sale_code: { type: Number },
    sale_details: [{
        ref: "SaleDetails",
        type: Schema.Types.ObjectId
    }],
    sale_vat: { type: Number },
    sale_total: { type: Number },
    sale_value: { type: Number },
});

module.exports = mongoose.model('Sales', sale_schema)