const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const User = mongoose.model('user');

// TODO: Maybe combine the logic in requireAuth and requireAdmin middlewares
// to prevent repeating codes
module.exports = (req, res, next) => {
	const header = req.headers.authorization;
	let token;

	if (header) token = header.split(" ")[1];

	if (token) {
	    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				res.status(401).json({ errors: { global: "Invalid token" } });
			} else {
				User.find({ email: decoded.email, role: decoded.role }).then(user => {
					// console.log("requireAdminRole", user);
					if (user.role === 'user' || user.role === 'demo_user') {
						res.redirect('/dashboard');
					}
					next();
				});
			}
	    });
	} else {
    	res.status(401).json({ errors: { global: "No token" } });
  	}
	// console.log("requireAdminRole res:", res );
	// refer to the another middleware with AUTH
	// decode the JWT
	// if decoded.role === "user" decoded.role === "demo_user"
	// redirects to /dashboard route
}