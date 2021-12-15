const {roles: existing_roles} = require('../models/roles');
const check_existing_roles = ({ body: { roles } }, res, next) => {
    if (roles)
        for (const role of roles)
            if (!existing_roles.includes(role)) return res.status(400).json({
                message: `Role ${role} does not exists`
            })
    next()
}

module.exports = {
    check_existing_roles
}