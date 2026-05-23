const mongoose = require('mongoose')

const favoriteSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },

    hostelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "hostels",
        required: true
    }

})

const favorite = mongoose.model("favorites", favoriteSchema)

module.exports = favorite