const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const formData = require('express-form-data');
const cloudinary = require('cloudinary');

const keys = require('./config/keys');

mongoose.set('useFindAndModify', false);

// models
require('./models/User');
require('./models/Product');
require('./models/Cart');
require('./models/Checkout');
require('./models/Review');
require('./models/Notification');
require('./models/Form'); 

dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});

mongoose.Promise = global.Promise;

const mongooseConfig = { 
	useNewUrlParser: true, 
	useCreateIndex: true, 
	useUnifiedTopology: true 
}

// Local DB
// mongoose.connect(process.env.MONGODB_URL, mongooseConfig);

// Remote DB
mongoose.connect(process.env.MLAB_URL, mongooseConfig);

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

const app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(formData.parse());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});

app.use(cors({
	origin: process.env.HOST,
}));

// routes
require('./routes/authRoutes')(app); 
require('./routes/userRoutes')(app);  
require('./routes/productRoutes')(app); 
require('./routes/cartRoutes')(app); 
require('./routes/checkoutRoutes')(app); 
require('./routes/reviewRoutes')(app); 
require('./routes/notificationRoutes')(app); 

require('./routes/formRoutes')(app); 

mongoose.connection.once('open', () => {
	console.log("Successfully connected to a database.");
}).on('error', error => {
	console.log("Connection failed:", error);
});


if (process.env.NODE_ENV === 'production') {
	app.use(express.static('app-client/build'));

	const path = require('path');
	
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'app-client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);

process.setMaxListeners(0);

