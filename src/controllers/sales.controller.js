const SALE = require('../models/sales');

const find_sales = async (_, res) => {
    try {
        const sales = await SALE.find();
        res.status(200).json(sales);
    } catch {
        res.sendStatus(404);
    }
};

const find_sale_by_id = async ({ params: { id } }, res) => {
    try {
        const sale = await SALE.findById(id).populate("sale_details");
        res.status(200).json(sale)
    } catch {
        res.sendStatus(404);
    }
};

const create_sale = async ({ body: { customer_id, sale_code, sales, sale_vat, sale_total, sale_value } }, res) => {
    try {
        const sale = new SALE({ customer_id, sale_code, sales, sale_vat, sale_total, sale_value });
        await sale.save();
        res.status(201).json(sale);
    } catch {
        res.sendStatus(404);
    }
};

const find_sale_and_update = async ({ body: { customer_id, sale_code, sales, sale_vat, sale_total, sale_value }, params: { id: _id } }, res) => {
    try {
        const updated_client = await SALE.findOneAndUpdate({ _id }, { customer_id, sale_code, sales, sale_vat, sale_total, sale_value });
        res.status(201).json(updated_client);
    } catch {
        res.sendStatus(404);
    }
}

const find_sale_and_remove = async ({ params: { id } }, res) => {
    try {
        const removed_sale = await SALE.findByIdAndRemove(id);
        res.json(removed_sale);
    } catch {
        res.sendStatus(404);
    }
}

module.exports = {
    find_sales, find_sale_by_id, find_sale_and_update,
    find_sale_and_remove, create_sale
};