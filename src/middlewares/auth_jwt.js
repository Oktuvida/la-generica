const jwt = require('jsonwebtoken');
const config = require('../config');
const USER = require('../models/users');

const verify_token = async (req, res, next) => {
    try {
        const bearer_token = req.headers.authorization;
        if (!bearer_token) return res.status(403).json({ message: "No token provided" });
        const token = bearer_token.split(' ')[1];
        const { id } = jwt.verify(token, config.SECRET);
        req.userId = id;

        const user = await USER.findById(req.userId).populate("roles");
        if (!user) return res.status(404).json({ message: "No user found" });

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" })
    }
};

const is_admin = async (req, res, next) => {
    const { roles } = await USER.findById(req.userId).populate('roles');
    for (const { name } of roles)
        if (name === "admin")
            return next();
    return res.status(403).json({ message: "Administrator role required" });
};

module.exports = {
    verify_token, is_admin
}