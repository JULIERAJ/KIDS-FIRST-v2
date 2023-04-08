const multer = require('multer');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
};

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,  // max size 5MB
        files: 1, // 1 files
    },
    fileFilter: (_req, file, cb) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype]; // !! - convert to boolean
        let error = isValid ? null : new Error('Invalid mime type!');
        cb(error, isValid);
    }
});

module.exports = upload;