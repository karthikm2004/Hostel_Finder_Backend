const booking = require('../Models/bookingModel')
const hostels = require('../Models/hostelModel')








// ADD BOOKING
exports.addBooking = async (req, res) => {

    try {

        const userId = req.userId

        const {
            hostelId,
            fullName,
            phone,
            members,
            checkInDate
        } = req.body

        // GET HOSTEL

        const hostelData = await hostels.findById(hostelId)

        if (!hostelData) {

            return res.status(404).json("Hostel not found")

        }

        // IMPORTANT FIX

        const ownerId = hostelData.ownerid

        // CREATE BOOKING

        const newBooking = new booking({

            userId,
            hostelId,
            ownerId,

            fullName,
            phone,
            members,
            checkInDate,

            status: "Pending"

        })

        await newBooking.save()

        res.status(200).json(newBooking)

    }

    catch (err) {

        console.log("ADD BOOKING ERROR :", err)

        res.status(500).json(err)

    }

}



// GET USER BOOKINGS
exports.getUserBookings = async (req, res) => {

    try {

        const userId = req.userId

        const userBookings = await booking
            .find({ userId })
            .populate("hostelId")

        res.status(200).json(userBookings)

    }

    catch (err) {

        console.log("USER BOOKINGS ERROR :", err)

        res.status(500).json(err)

    }

}








// GET OWNER BOOKINGS
exports.getOwnerBookings = async (req, res) => {

    try {

        const ownerId = req.userId

        const allBookings = await booking
            .find({ ownerId })
            .populate("hostelId")
            .populate("userId")

        res.status(200).json(allBookings)

    }

    catch (err) {

        console.log("OWNER BOOKINGS ERROR :", err)

        res.status(500).json(err)

    }

}

exports.confirmBooking = async (req, res) => {

    try {

        const { id } = req.params

        await booking.findByIdAndUpdate(id, {

            status: "Confirmed"

        })

        res.status(200).json("Booking Confirmed")

    }

    catch (err) {

        console.log(err)

        res.status(500).json(err)

    }

}



// UPDATE BOOKING STATUS
exports.updateBookingStatus = async (req, res) => {

    try {

        const { id } = req.params
        const { status } = req.body

        const updatedBooking = await booking.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        )

        res.status(200).json(updatedBooking)

    } catch (err) {

        console.log("UPDATE BOOKING STATUS ERROR :", err)

        res.status(500).json(err)

    }

}


exports.getAllBookings = async (req, res) => {

    try {

        const allBookings = await bookings
            .find()
            .populate("hostelId")
            .sort({ createdAt: -1 })

        res.status(200).json(allBookings)

    }

    catch (err) {

        console.log(err)

        res.status(500).json(err)

    }

}


exports.getRecentBookings = async (req, res) => {

    try {

        const recentBookings = await booking
            .find()
            .populate("hostelId")
            .sort({ createdAt: -1 })
            .limit(5)

        res.status(200).json(recentBookings)

    }

    catch (err) {

        console.log(err)

        res.status(500).json(err)

    }

}