const mongoose = require('mongoose')

const hostelSchema = new mongoose.Schema({
    ownerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ownerUser",             /* this objectId belongs to users collection */
        required: true
    },
    propertyname: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        default: ""
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    area: {
        type: String,
        required: true,
        trim: true             /* to remove extra space from text */
    },
    address: {
        type: String,
        required: true,

    },
    price: {
        type: Number,
        required: true
    },
    hostelfor: {
        type: String,
        enum: ["Boys", "Girls", "Both"],   /* restricts values to a fixed list */

    },
    roomtype: {
        type: String,
        enum: ["AC", "Non-AC"]
    },
    availability: {
        type: String,
        required: true
    },
    facilities: [
        {
            type: String,
            required: true
        }
    ],
    uploadImg: [
        {
            type: String,
            required: true
        }
    ],
    rating: {
        type: Number,
        default: 0
    },
    rules: {
        type: [String],
        required: true
    },
    isapproved: {
        type: Boolean,
        default: false

    },
    isactive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })


const hostels = mongoose.model("hostels", hostelSchema)
module.exports = hostels