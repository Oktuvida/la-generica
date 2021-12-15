const {model: ROLE} = require('../models/roles');
const USER = require('../models/users')

const create_roles = async () => {
    try {
        const count = await ROLE.estimatedDocumentCount();
        if (count > 0) return;

        return Promise.all([
            new ROLE({name: "user"}).save(),
            new ROLE({name: "admin"}).save(),
        ]);
    } catch (err) {
        console.log(err);
    }
}

const create_admin = async () => {
    try {
        const data_user = {
            email: "admin@example.com",
            username: "admin",
            password: await USER.encrypt_password("Admin12345."),
            roles: [await ROLE.findOne({name: "admin"})]
        }
        const user_found = await USER.findOne({email: data_user.email});
        if (!user_found) {
            const user_saved = new USER(data_user).save()
            console.log(user_saved);
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    create_roles,
    create_admin
}