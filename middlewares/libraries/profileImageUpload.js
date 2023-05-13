const CustomError = require("../../helpers/error/CustomError")
const multer = require("multer")
const path = require("path")

// Storage, FileFilter
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const rootDirectory = path.dirname(require.main.filename)
        cb(null, path.join(rootDirectory, "/public/uploads"))
    },
    filename: function (req, file, cb) {
        const extension = file.mimetype.split("/")[1]
        req.savedProfileImage = "image_" + req.user.id + "." + extension
        cb(null, req.savedProfileImage)
    }
})

const fileFilter = (req, file, cb) => {
    let allowedMimeTypes = ["image/jpeg", "image/jpg", "image/gif", "image/png"]
    if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new CustomError("Please provide a valid file type", 400, false))
    }

    return cb(null, true)
}

const profileImageUpload = multer({
    storage: storage,
    fileFilter: fileFilter
})

module.exports = profileImageUpload