const mongoose = require("mongoose");

const PetSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    animal_type: {
        type: String,
        required: true,
    },

    breed: {
        type: String,
    },

    description: {
        type: String,
    },

    age: {
        type: Number,
    },

    profilePicture: {
        type: String,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }

});

const Pet = mongoose.model("Pet", PetSchema);

exports.Pet = Pet;
