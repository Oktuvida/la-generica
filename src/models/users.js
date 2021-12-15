const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { genSalt, hash, compare } = require('bcryptjs');

const user_schema = new Schema({
    username: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
    versionKey: false,
});

user_schema.statics.encrypt_password = async (password) => {
    const salt = await genSalt(10);
    return await hash(password, salt);
}

user_schema.statics.compare_password = async (password, received_password) => await compare(password, received_password);

module.exports = model('Users', user_schema)