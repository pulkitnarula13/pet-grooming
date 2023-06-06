const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        unique: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    phoneNumber: {
        type: Number,
    },
    
    address: { type: String },

    profilePicture: {
        type: String,
    },

    pets: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Pet" }
    ]

});

const User = mongoose.model("User", UserSchema);

exports.User = User;
