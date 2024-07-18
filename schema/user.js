const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    id: { type: Object },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
});

userSchema.pre("save", function(next) {
    if (this.isModified("password") || this.isNew) {
        const document = this;
        bcrypt.hash(document.password, 10, (err, hash) => {
            if (err) {
                next(err);
            } else {
                document.password = hash;
                next();
            }
        });
    } else {
        next();
    }
});

module.exports = mongoose.model("User", userSchema);
