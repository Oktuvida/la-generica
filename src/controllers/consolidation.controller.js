const CONSOLIDATION = require('../models/consolidation');

const find_consolidations = async (_, res) => {
    try {
        const consolidations = await CONSOLIDATION.find();
        res.status(200).json(consolidations);
    } catch {
        res.sendStatus(404);
    }
};

const find_consolidation_by_id = async ({ params: { id } }, res) => {
    try {
        const consolidation = await CONSOLIDATION.findById(id);
        res.status(200).json(consolidation)
    } catch {
        res.sendStatus(404);
    }
};

const create_consolidation = async ({ body: { id, city, total_sales } }, res) => {
    try {
        const consolidation = new CONSOLIDATION({ id, city, total_sales });
        await consolidation.save();
        res.status(201).json(consolidation);
    } catch {
        res.sendStatus(404);
    }
};

const find_consolidation_and_update = async ({ body: { id, city, total_sales }, params: { id: _id } }, res) => {
    try {
        const updated_consolidation = await CONSOLIDATION.findOneAndUpdate({ _id }, { id, city, total_sales });
        res.status(200).json(updated_consolidation);
    } catch {
        res.sendStatus(404);
    }
}

const find_consolidation_and_remove = async ({ params: { id } }, res) => {
    try {
        const removed_consolidation = await CONSOLIDATION.findByIdAndRemove(id);
        res.json(removed_consolidation);
    } catch {
        res.sendStatus(404);
    }
}

module.exports = {
    find_consolidations, find_consolidation_by_id, find_consolidation_and_update,
    find_consolidation_and_remove, create_consolidation
};