const hostels = require('../Models/hostelModel')



// ADD HOSTEL
exports.addHostel = async (req, res) => {

    try {

        const ownerid = req.userId

        const {
            propertyname,
            description,
            city,
            area,
            address,
            price,
            hostelfor,
            roomtype,
            facilities,
            rules,
            availability
        } = req.body

        let uploadImg = []

        if (req.files) {

            uploadImg = req.files.map(
                file => file.filename
            )

        }

        const facilityArray = facilities
            ? facilities.split(',').map(item => item.trim())
            : []

        const rulesArray = rules
            ? rules
                .split(/\r?\n/)
                .map(rule => rule.trim())
                .filter(rule => rule !== "")
            : []

        const existingHostel = await hostels.findOne({

            ownerid,
            propertyname,
            address

        })

        if (existingHostel) {

            return res.status(400).json(
                "Hostel already added"
            )

        }

        const newHostel = new hostels({

            ownerid,

            propertyname,
            description,

            city,
            area,
            address,

            price,

            hostelfor,
            roomtype,

            facilities: facilityArray,

            rules: rulesArray,

            availability,

            uploadImg,

            isapproved: false,

            isactive: true

        })

        await newHostel.save()

        res.status(200).json({

            message: "Hostel Added Successfully",
            hostel: newHostel

        })

    }

    catch (err) {

        console.log(err)

        res.status(500).json("Internal Server Error")

    }

}



// HOME HOSTELS
exports.getHomeHostels = async (req, res) => {

    try {

        const hostelList = await hostels.find({

            isapproved: true

        })

            .sort({ createdAt: -1 })

            .limit(4)

        res.status(200).json(hostelList)

    }

    catch (err) {

        console.log(err)

        res.status(500).json("Server Error")

    }

}



// GET ALL HOSTELS
exports.getAllHostels = async (req, res) => {

    try {

        const { search } = req.query

        let filter = {

            isapproved: true

        }

        if (search) {

            filter.city = {

                $regex: search,
                $options: "i"

            }

        }

        const allHostels = await hostels.find(filter)

        res.status(200).json(allHostels)

    }

    catch (err) {

        console.log(err)

        res.status(500).json("Server Error")

    }

}



// GET SINGLE HOSTEL
exports.getHostel = async (req, res) => {

    try {

        const { id } = req.params

        const hostelData = await hostels.findById(id)

        if (!hostelData) {

            return res.status(404).json(
                "Hostel Not Found"
            )

        }

        res.status(200).json(hostelData)

    }

    catch (err) {

        console.log(err)

        res.status(500).json("Server Error")

    }

}



// OWNER HOSTELS
exports.getOwnerHostels = async (req, res) => {

    try {

        const ownerid = req.userId

        const ownerHostels = await hostels.find({

            ownerid

        })

        res.status(200).json(ownerHostels)

    }

    catch (err) {

        console.log(err)

        res.status(500).json("Server Error")

    }

}



// GET PENDING HOSTELS
exports.getPendingHostels = async (req, res) => {

    try {

        const pendingHostels = await hostels.find({

            isapproved: false

        })

        res.status(200).json(pendingHostels)

    }

    catch (err) {

        console.log(err)

        res.status(500).json("Server Error")

    }
    console.log("PENDING API CALLED")
    console.log(pendingHostels)

}



// APPROVE HOSTEL
exports.approveHostel = async (req, res) => {

    try {

        const { id } = req.params

        const approvedHostel = await hostels.findByIdAndUpdate(

            id,

            {

                isapproved: true

            },

            {

                new: true

            }

        )

        res.status(200).json(approvedHostel)

    }

    catch (err) {

        console.log(err)

        res.status(500).json("Server Error")

    }

}



// REJECT HOSTEL
exports.rejectHostel = async (req, res) => {

    try {

        const { id } = req.params

        await hostels.findByIdAndDelete(id)

        res.status(200).json("Hostel Rejected")

    }

    catch (err) {

        console.log(err)

        res.status(500).json("Server Error")

    }

}



// UPDATE HOSTEL
exports.updateHostel = async (req, res) => {

    try {

        const { id } = req.params

        const {
            propertyname,
            city,
            area,
            price,
            hostelfor
        } = req.body

        const updatedHostel = await hostels.findByIdAndUpdate(

            id,

            {
                propertyname,
                city,
                area,
                price,
                hostelfor
            },

            {
                new: true
            }

        )

        res.status(200).json(updatedHostel)

    }

    catch (err) {

        console.log(err)

        res.status(500).json("Server Error")

    }

}



// DELETE HOSTEL
exports.deleteHostel = async (req, res) => {

    try {

        const { id } = req.params

        await hostels.findByIdAndDelete(id)

        res.status(200).json("Hostel deleted successfully")

    }

    catch (err) {

        console.log(err)

        res.status(500).json("Server Error")

    }

}


exports.getRecentHostels = async (req, res) => {

    try {

        const recentHostels = await hostels
            .find()
            .sort({ createdAt: -1 })
            .limit(5)

        res.status(200).json(recentHostels)

    }

    catch (err) {

        console.log(err)

        res.status(500).json(err)

    }

}