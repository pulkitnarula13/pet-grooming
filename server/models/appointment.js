const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Appointment = new Schema(
    {
        date: {
            type: Date,
        },

        time: {
            type: String
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        shop: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shop",
            required: true,
        },

        pet: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pet",
        },

        description: {
            type: String,
        },

        completed: {
            type: Boolean,
        },

        confirmed: {
            type: Boolean,
        },

        cancelled: {
            type: Boolean
        }
    },
    
    {
        timestamps: true,
    }
);

exports.Appointment = mongoose.model("Appointment", Appointment);
