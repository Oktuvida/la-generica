const PRODUCT = require('../models/products');

const find_products = async (_, res) => {
    try {
        const products = await PRODUCT.find();
        res.status(200).json(products);
    } catch {
        res.sendStatus(404);
    }
};

const find_product_by_id = async ({ params: { id } }, res) => {
    try {
        const product = await PRODUCT.findById(id);
        res.status(200).json(product)
    } catch {
        try {
            const product = await PRODUCT.findOne({ product_code: id });
            res.status(200).json(product);
        } catch {
            res.sendStatus(404);
        }
    }
};

const create_product = async ({ body: { product_code, vat_sale, supplier_nit, product_name, purchase_price, selling_price } }, res) => {
    try {
        const product = new PRODUCT({ product_code, vat_sale, supplier_nit, product_name, purchase_price, selling_price });
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.sendStatus(400).json(err);
    }
};

const find_product_and_update = async ({ body: { product_code, vat_sale, supplier_nit, product_name, purchase_price, selling_price }, params: { id: _id } }, res) => {
    try {
        const updated_product = await PRODUCT.findOneAndUpdate({ _id }, { product_code, vat_sale, supplier_nit, product_name, purchase_price, selling_price });
        res.status(200).json(updated_product);
    } catch (err) {
        res.sendStatus(404).json(err);
    }
}

const find_product_and_remove = async ({ params: { id } }, res) => {
    try {
        const removed_product = await PRODUCT.findByIdAndRemove(id);
        res.json(removed_product);
    } catch (err) {
        res.sendStatus(404).json(err);
    }
}

module.exports = {
    find_products, find_product_by_id, find_product_and_update,
    find_product_and_remove, create_product
};