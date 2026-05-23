const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },

    hostelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "hostels"
    },

    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ownerUser"
    },

    fullName: {
        type: String
    },

    phone: {
        type: String
    },

    members: {
        type: Number
    },

    checkInDate: {
        type: String
    },

    status: {
        type: String,
        default: "Pending"
    }

}, { timestamps: true })

const bookings = mongoose.model("bookings", bookingSchema)

module.exports = bookings