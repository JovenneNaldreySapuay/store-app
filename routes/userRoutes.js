const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
// const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');

const parseErrors = require('../utils/parseErrors');
const {sendConfirmationEmail} = require('../mailer'); // Using Nodemailer
const requireAuthenticate = require('../middlewares/requireAuthenticate');

// USER MODEL
const User = mongoose.model('user'); 

const encryptPassword = (password) => {
	return bcrypt.hashSync(password, 10);
};

module.exports = app => {	
	app.post('/api/users', async (req, res) => {	

		try {
			const { email, password, fullName } = req.body.user;
			const user = new User({ email, fullName, password });

			user.setPassword(password);
			user.setConfirmationToken();

			await user.save()	
				.then(userRecord => {
					sendConfirmationEmail(userRecord);
					res.json({ user: userRecord.toAuthJSON() })
				});
		} catch (err) {
			res.status(400).json({ errors: parseErrors(err.errors) });
		}
	});

	app.get('/api/users', async (req, res) => {
		await User
		.find({}).
		select('-__v').
		populate({
			path: 'posts',
			select: 'title content'
		}).
		exec(function (err, data) {
			if (err) console.error(err);
			res.json(data);
		});
	});

	app.get('/api/users/:_id', async (req, res) => {	
		const id = req.params._id;

		await User
		.findById({ 
			_id: new mongoose.Types.ObjectId(id) 
		}).
		exec(function (err, data) {
			if (err) console.error(err);
			res.json(data);
		});
	});

	// Updating user
	app.put('/api/users/:_id', async (req, res) => {
		const { 
			_id, 
			fullName,
			email,
			role,
			phone,
			address,
			city,
			province,
			country,
			zipcode
		} = req.body.data;		
		
		// console.log("Update req.body:", req.body.data);
		
		// const hashPass = encryptPassword(password);
		// console.log("Hashed Password:", hashPass);
		
		// ---------FOR POSTMAN TEST ONLY------------------------
		/*
		console.log("For Postman Test Req Body:", req.body);
		const hashPassPostMan = encryptPassword(req.body.passwordHash);
		console.log("New Hash:", hashPassPostMan);	
		
		await User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId( req.body._id )}, 
			{ 
				role: req.body.role,
				fullName: req.body.fullName,
				passwordHash: hashPassPostMan 
			}, 
			{ 
				new: true,
				upsert: true
			}, 
			(err, data) => {
				res.json(data);
			}
		);
		*/
		// ---------END FOR POSTMAN TEST ONLY------------------------
		
		// ---------FOR ACTUAL WEBSITE------------------------
		
		await User
		.findOneAndUpdate({ 
			_id: new mongoose.Types.ObjectId(_id)
		}, 
			{ 
				fullName,
				email,
				role,
				phone,
				address,
				city,
				province,
				country,
				zipcode
			}, 
			{ 
				new: true
			}, 
			(err, data) => {
				res.json(data);
			}
		);
	
	});
	
	// fullname, password, role are the editable data inside this MODEL
	// See this from net ninja - https://www.youtube.com/watch?v=Hu3m6gBcrnA
	/*
	app.put('/api/users/:_id', async (req, res) => {
		const { id, role } = req.body.data; 
	
		await User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id)}, 
			{ role }, 
			{ new: true }, 
			(err, info) => {
				res.send({ info });
			}
		);
	}); 
	*/


	// app.get('/api/users', async (req, res) => {
	// 	const users = await User.find({});

	// 	// res.send(users);
	// 	res.json(users);
	// });

	// app.get('/api/current_user', async(req, res) => {
	// 	// res.send(req.session);
	// 	res.send(req.body.user);
	// });

	app.get('/contact', async(req, res) => {
		
		const keys = require('../config/keys');

		const { name, sender, recipient, phone, company, message } = req.query;

		const transport = nodemailer.createTransport({
			host: keys.emailHost,
			port: keys.emailPort,
			auth: {
				user: keys.emailUser,
			    pass: keys.emailPass
			},
			tls: {
		    	rejectUnauthorized: false
		    }
		});
		

		const mailOptions = {
        	from: `Website Customer <${sender}>`,
        	to: 'jovenneregs@gmail.com', // website owner email here...
        	subject: 'Let us do business together!',
        	text: `
				Company: ${company}
				Phone: ${phone}
				Message: ${message}
        	`
    	};

    	await transport.sendMail(mailOptions, (error, info) => {
			if (error) { return console.log(error);	}
			console.log('Message sent: %s', info.messageId);   
		});
	});

};

