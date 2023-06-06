const mongoose = require("mongoose");

const ShopSchema = mongoose.Schema({
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

    desciption: {
        type: String,
    }

});

const Shop = mongoose.model("Shop", ShopSchema);

exports.Shop = Shop;
