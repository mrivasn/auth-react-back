const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    id: { type: Object },
    token: { type: String, require: true}
});

module.exports = mongoose.model("Token", tokenSchema);