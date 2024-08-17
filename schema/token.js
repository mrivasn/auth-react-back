const Mongoose = require("mongoose");

const tokenSchema = new Mongoose.Schema({
    id: { type: Object },
    token: { type: String, require: true}
});

module.exports = Mongoose.model("Token", tokenSchema);