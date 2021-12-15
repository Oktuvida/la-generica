const USER = require('../models/users');
const {model: ROLE} = require('../models/roles');

const find_users = async (_, res) => {
    try {
        const users = await USER.find().populate('roles');
        res.status(200).json(users);
    } catch (err) {
        res.sendStatus(400);
    }
};

const create_user = async ({body: {password, username, email, roles}}) => {
    try {
        const user_found = await USER.findOne({email});
        if (user_found) return res.status(403).json({message: "User already exists"});
        const user = new USER({
            username,
            email,
            password: await USER.encrypt_password(password)
        });
        if (roles) {
            const found_roles = await ROLE.find({name: {$in: roles}});
            user.roles = found_roles.map(role => role._id);
        } else {
            const role = await ROLE.findOne({name: 'user'});
            user.role = [role._id];
        }
        const saved_user = await user.save();
        res.status(200).json(saved_user);
    } catch {
        res.sendStatus(400);
    }
}

const find_user_by_id = async ({params: {id}}, res) => {
    try {
        const user = await USER.findById(id).populate('roles');
        res.status(200).json(user);
    } catch (err) {
        res.sendStatus(400);
    }
};


const find_user_and_remove = async ({params: {id}}, res) => {
    try {
        const removed_user = await USER.findByIdAndRemove(id);
        res.status(200).json(removed_user);
    } catch {
        res.sendStatus(404);
    }
};

module.exports = {
    find_users, find_user_by_id, find_user_and_remove, create_user
}