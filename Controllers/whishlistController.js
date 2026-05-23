const favorite = require('../Models/whishlistModel')
const hostels = require('../Models/hostelModel')



// ADD TO FAVORITE
exports.addFavorite = async (req, res) => {

    try {

        const userId = req.userId
        const { hostelId } = req.body

        const existingFavorite = await favorite.findOne({
            userId,
            hostelId
        })

        if (existingFavorite) {
            return res.status(200).json("Already Added")
        }

        const newFavorite = new favorite({
            userId,
            hostelId
        })

        await newFavorite.save()

        res.status(200).json(newFavorite)

    } catch (err) {

        console.log(err)

        res.status(500).json(err)

    }

}


// GET USER FAVORITES
exports.getFavorites = async (req, res) => {

    try {

        const userId = req.userId

        const allFavorites = await favorite
            .find({ userId })
            .populate("hostelId")

        res.status(200).json(allFavorites)

    }

    catch (err) {

        console.log("GET FAVORITES ERROR :", err)

        res.status(500).json(err)

    }

}

exports.removeFavorite = async (req, res) => {

    try {

        const { id } = req.params

        const deletedFavorite = await favorite.findByIdAndDelete(id)

        if (!deletedFavorite) {

            return res.status(404).json("Favorite not found")

        }

        res.status(200).json("Favorite removed successfully")

    }

    catch (err) {

        console.log("REMOVE FAVORITE ERROR :", err)

        res.status(500).json(err)

    }

}