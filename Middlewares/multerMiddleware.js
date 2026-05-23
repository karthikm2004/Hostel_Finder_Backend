const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './hostelImages')
    },
    filename: (req, file, cb) => {
        const filename = `image-${Date.now()}-${file.originalname}`
        cb(null, filename)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpg" || file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

const multerConfig=multer({
    storage,
    fileFilter
})

module.exports=multerConfig