const SALE_DETAIL = require('../models/sale_details');

const find_sale_details = async (_, res) => {
    try {
        const sale_details = await SALE_DETAIL.find();
        res.status(200).json(sale_details);
    } catch {
        res.sendStatus(404);
    }
};

const find_sale_detail_by_id = async ({ params: { id } }, res) => {
    try {
        const sale_detail = await SALE_DETAIL.findById(id);
        res.status(200).json(sale_detail)
    } catch {
        res.sendStatus(404);
    }
};

const create_sale_detail = async ({ body: { number_products, product_code, vat_value, total_value, sale_value } }, res) => {
    try {
        const sale_detail = new SALE_DETAIL({ number_products, product_code, vat_value, total_value, sale_value });
        await sale_detail.save();
        res.status(201).json(sale_detail);
    } catch {
        res.sendStatus(404);
    }
};

const find_sale_detail_and_update = async ({ body: { number_products, product_code, vat_value, total_value, sale_value }, params: { id: _id } }, res) => {
    try {
        await SALE_DETAIL.findOneAndUpdate({ _id }, { number_products, product_code, vat_value, total_value, sale_value });
        res.status(200).json({ status: "Client updated" });
    } catch {
        res.sendStatus(404);
    }
}

const find_sale_detail_and_remove = async ({ params: { id } }, res) => {
    try {
        const removed_sale_detail = await SALE_DETAIL.findByIdAndRemove(id);
        res.json(removed_sale_detail);
    } catch {
        res.sendStatus(404);
    }
}

module.exports = {
    find_sale_details, find_sale_detail_by_id, find_sale_detail_and_update,
    find_sale_detail_and_remove, create_sale_detail
};