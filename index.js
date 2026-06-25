require('dotenv').config()
require('./Conection/conection')

const express = require('express')
const path = require('path')
const router = require('./Routes/routes')
const cors = require('cors')

const app = express()

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://hostel-finder-frontend-sandy.vercel.app"
    ],
    credentials: true
}))
app.use(express.json())
app.use(router)
app.use('/uploadImg', express.static(path.join(__dirname, 'hostelImages')))

const PORT = process.env.PORT || 3000


const reqHandler = (req, res) => {
    res.send("Request Hit")
}

app.use('/', reqHandler)

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log(`Server running at http://localhost:${PORT}`);
    }
})