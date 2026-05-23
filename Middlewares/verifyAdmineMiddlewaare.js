const verifyAdmin = (req, res, next) => {

    try {

        console.log("ROLE :", req.role)

        if (req.role !== "admin") {

            return res.status(403).json(
                "Access Denied. Admin Only"
            )

        }

        next()

    }

    catch (err) {

        console.log(err)

        res.status(500).json("Authorization Failed")

    }

}

module.exports = verifyAdmin