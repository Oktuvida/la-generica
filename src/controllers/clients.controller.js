const CLIENT = require('../models/clients');

const find_clients = async (_, res) => {
    try {
        const clients = await CLIENT.find();
        res.status(200).json(clients);
    } catch {
        res.sendStatus(404);
    }
};

const find_client_by_id = async ({ params: { id } }, res) => {
    try {
        const client = await CLIENT.findById(id);
        res.status(200).json(client)
    } catch {
        try {
            const client = await CLIENT.findOne({ id });
            res.status(200).json(client);
        } catch {
            res.sendStatus(404);
        }
    }
};

const create_client = async ({ body: { id, address, email, name, phone } }, res) => {
    try {
        const client = new CLIENT({ id, address, email, name, phone });
        await client.save();
        res.status(201).json(client);
    } catch {
        res.sendStatus(404);
    }
};

const find_client_and_update = async ({ body: { id, address, email, name, phone }, params: { id: _id } }, res) => {
    try {
        const updated_client = await CLIENT.findOneAndUpdate({ _id }, { id, address, email, name, phone });
        res.status(200).json(updated_client);
    } catch {
        res.sendStatus(404);
    }
}

const find_client_and_remove = async({ params: { id } }, res) => {
    try {
        const removed_client = await CLIENT.findByIdAndRemove(id);
        res.json(removed_client);
    } catch {
        res.sendStatus(404);
    }
}

module.exports = {
    find_clients, find_client_by_id, find_client_and_update, 
    find_client_and_remove, create_client
};