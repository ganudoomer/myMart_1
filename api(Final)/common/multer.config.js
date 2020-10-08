const multer = require('multer');
const ObjectID = require('mongodb').ObjectID;

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'public/images');
	},
	filename: function(req, file, cb) {
		cb(null, ObjectID() + '-' + file.originalname);
	}
});
const upload = multer({ storage: storage }).single('file');

module.exports = upload;
