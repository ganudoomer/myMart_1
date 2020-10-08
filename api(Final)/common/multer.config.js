const multer = require('multer');
const ObjectID = require('mongodb').ObjectID;
const sharp = require('sharp');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'public/images');
	},
	filename: function(req, file, cb) {
		cb(null, ObjectID() + '-' + file.originalname);
	}
});
const upload = multer({ storage: storage }).single('file');

//Resize and save to server
module.exports.upload = (req, res) => {
	const url = req.protocol + '://' + req.get('host') + '/images/';
	upload(req, res, async function(err) {
		if (!req.file) {
			return { status: 'failed', message: 'No image to upload' };
		}
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err);
		} else if (err) {
			return res.status(500).json(err);
		}

		try {
			const bismi = {
				imageName: url + req.file.filename,
				thumbnail: url + 'thumbnails/' + 'thumbnails-' + req.file.filename
			};
			sharp(req.file.path)
				.resize(416, 234)
				.toFile('public/images/thumbnails/' + 'thumbnails-' + req.file.filename, (err, resizeImage) => {
					if (err) {
						console.log(err);
					} else {
						console.log(resizeImage);
						return res.json(bismi);
					}
				});
		} catch (error) {
			console.error(error);
		}
	});
};
