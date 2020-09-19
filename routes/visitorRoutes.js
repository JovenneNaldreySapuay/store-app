const express = require("express");
const mongoose = require("mongoose");
const formData = require("express-form-data");
const jwt = require("jsonwebtoken");

const requireAuthenticate = require("../middlewares/requireAuthenticate");
const requireAdminRole = require("../middlewares/requireAdminRole");

const Visitor = mongoose.model("visitor");

const validate = (data) => {
  let errors = {};
  if (data.email === "") errors.email = "Server error: Can't be empty";
  if (data.ip === "") errors.ip = "Server error: Can't be empty";
  if (data.country === "") errors.country = "Server error: Can't be empty";
  const isValid = Object.keys(errors).length === 0;

  return { errors, isValid };
};

module.exports = (app) => {
  // Saving visitor logs
  app.post("/api/visitors", async (req, res) => {
    
    // console.log("visitorRoutes.js values:", req.body);

    const { errors, isValid } = validate(req.body);

    const { ip, country } = req.body.values;

    if (isValid) {
      try {
        Visitor.findOne({ ip: ip }, async function(err, data) {
          if (err) console.log(err);

          if (data) {
            console.log("IP is already saved in our database.");
          } else {
            console.log("New IP detected.");

            const visitorData = new Visitor({ ip, country });

            await visitorData.save();

            res.json(visitorData);
          }
        });
      
      } catch (err) {

        res.status(422).send(err);

      }

    } else {

      res.status(400).json({ errors });

    }
  });

  // Get all visitors
  app.get("/api/visitors", async (req, res) => {
    await Visitor.find().exec(function (err, data) {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json(data);
    });
  });
};
