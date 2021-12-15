const USER = require('../models/users');
const ROLE = require('../models/roles');
const jwt = require('jsonwebtoken');
const config = require('../config');

const signup = async ({ body: { username, email, password, roles } }, res) => {
    let saved_user;
    try {
        let user;
        user = new USER({ username, email, password: await USER.encrypt_password(password) })
        if (roles) {
            const found_roles = await ROLE.find({ name: { $in: roles } });
            user.roles = found_roles.map(role => role._id);
        } else {
            const role = await ROLE.findOne({ name: "user" });
            user.roles = [role._id];
        }
        saved_user = await user.save();
    } catch (err) {
        return res.status(403).json(err);
    }

    const token = jwt.sign({ id: saved_user._id }, config.SECRET, {
        expiresIn: '24h'
    });
    res.status(200).json({ token });
};

const signin = async ({ body: { email, password } }, res) => {
    try {
        const user_found = await USER.findOne({ email }).populate("roles");
        if (!user_found) return res.status(400).json({ message: "User not found" });

        const match_passwd = await USER.compare_password(password, user_found.password);

        if (!match_passwd) return res.status(401).json({ token: null, mesagge: "Invalid password" });

        const token = jwt.sign({ id: user_found._id }, config.SECRET, {
            expiresIn: "24h"
        });
        res.status(200).json({ token });
    } catch (err) {
        res.json(err);
    }

}

const signout = async (_, res) => {
    res.json("signout");
}

module.exports = {
    signup, signout, signin
};