const users = require('../Models/userModel')
const jwt = require('jsonwebtoken')

// SIGNUP

exports.signUp = async (req, res) => {

    try {

        const { username, email, password } = req.body

        const existingUser = await users.findOne({ email })

        if (existingUser) {

            return res.status(400).json("User Already Exists")
            console.log(existingUser);
            

        }

        const newUser = new users({
            username,
            email,
            password
        })

        await newUser.save()

        res.status(200).json(newUser)

    }

    catch (err) {

        console.log(err)

        res.status(500).json(err)

    }

}

// SIGNIN

exports.signIn = async (req, res) => {

    try {

        const { email, password } = req.body

        const existingUser = await users.findOne({
            email,
            password
        })

        if (!existingUser) {

            return res.status(400).json("Invalid Email/Password")

        }

        const token = jwt.sign(

            {
                id: existingUser._id,
                role: existingUser.role || "user"
            },

            process.env.SECRET_KEY
        )

        console.log(existingUser)

        res.status(200).json({

            token,

            username: existingUser.username,

            role: existingUser.role || "user",

            profile: existingUser.profile || ""

        })

    }

    catch (err) {

        console.log(err)

        res.status(500).json(err)

    }

}


// update user profile
exports.userProfileUpdate = async (req, res) => {
    try {
        const userId = req.payload
        const { firstName, lastName, location, phone, email, profile } = req.body
        const updateUser = await users.findByIdAndUpdate(userId,{
            firstName, lastName, email, phone, location, profile
        },{new:true})
        res.status(200).json(updateUser)

    }
    catch (err) {
        console.log(err);
        res.status(500).json(err)

    }
}



// GET ALL USERS
exports.getAllUsers = async (req, res) => {

    try {

        const allUsers = await users.find({

            role: "user"

        })

        res.status(200).json(allUsers)

    }

    catch (err) {

        console.log(err)

        res.status(500).json(err)

    }

}