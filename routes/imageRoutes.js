// const Path = require('path-parser');
// const { URL } = require('url');
const mongoose = require('mongoose');

const Image = mongoose.model('image'); // test only

module.exports = app => {

	// Save Image
	app.post('/api/images', async (req, res) => {

		const { image } = req.body;

		console.log("Images req.body", req);

		const img = new Image({ image });

		try {
			await img.save();

		} catch (err) {

			res.status(422).send(err);

		}
	});
	
};

