const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  let token;

  if (header) token = header.split(" ")[1];

  // console.log("Header:", header );
  // console.log("Auth Token:", token );

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      // console.log("JWT Payload:", decoded );
      if (err) {
        res.status(401).json({ errors: { global: "Invalid token" } });
      } else {
        // video @ 20mins
        // https://www.youtube.com/watch?v=yo-XGC5z7Lo&list=PLuNEz8XtB51KthRFiVtI8cmXNL9qlQJ5U&index=11
        // Saving currentUser to req to use for adding books and db relationship
        User.find({ email: decoded.email }).then(user => {
          // console.log("LOGGED USER:", user );

          req.currentUser = user;
          // console.log("REQ CURRENT USER", req.currentUser );
          next();
        });
      }
    });
  } else {
    res.status(401).json({ errors: { global: "No token" } });
  }
};
