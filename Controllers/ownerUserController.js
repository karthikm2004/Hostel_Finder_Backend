const ownerUser = require('../Models/ownerUserModel')
const jwt = require('jsonwebtoken')



exports.ownerSignUp = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const existingUsers = await ownerUser.findOne({ email })
        if (existingUsers) {
            res.status(400).json("User Already Exist")
        }
        else {
            const newUser = new ownerUser({
                username, email, password
            })
            await newUser.save()
            res.status(200).json(newUser)
            console.log(newUser);

        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err)

    }
}

exports.ownerSignIn = async (req, res) => {
    try {
        const { email, password } = req.body

        const existingOwner = await ownerUser.findOne({ email, password })

        if (existingOwner) {
            const token = jwt.sign(
                {
                    id: existingOwner._id,
                    role: existingOwner.role   // ✅ IMPORTANT
                },
                process.env.SECRET_KEY
            )

            res.status(200).json({
                token,
                username: existingOwner.username,
                profile: existingOwner.profile,
                role: existingOwner.role   // ✅ IMPORTANT
            })

        } else {
            res.status(400).json("Invalid credentials")
        }

    } catch (err) {
        res.status(500).json(err)
    }
}