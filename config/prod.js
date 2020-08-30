module.exports = {
	shopUrl: process.env.MLAB_URL,
	jwtSecret: process.env.JWT_SECRET,
	host: process.env.HOST, 
	stripePublishableKey: process.env.STRIPE_PUBLISH_KEY,
	stripeSecretKey: process.env.STRIPE_SECRET_KEY,
	emailHost: process.env.EMAIL_HOST,
	emailPort: process.env.EMAIL_PORT,
	emailUser: process.env.EMAIL_USER,
	emailPass: process.env.EMAIL_PASS, 
};