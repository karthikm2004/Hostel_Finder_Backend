const jwt = require('jsonwebtoken')

const jwtMiddleWare = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization

        if (!authHeader) {

            return res.status(401).json("Token Missing")

        }

        const token = authHeader.split(" ")[1]

        if (!token) {

            return res.status(401).json("Invalid Token")

        }

        const decoded = jwt.verify(
            token,
            process.env.SECRET_KEY
        )

        console.log(decoded)

        req.userId = decoded.id

        req.role = decoded.role

        next()

    }

    catch (err) {

        console.log(err)

        res.status(401).json("Authorization Failed")

    }

}

module.exports = jwtMiddleWare