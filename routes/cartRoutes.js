const express = require("express");
const mongoose = require("mongoose");
const formData = require("express-form-data");
const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");

const requireAuthenticate = require("../middlewares/requireAuthenticate");
const requireAdminRole = require("../middlewares/requireAdminRole");
const keys = require("../config/keys");

const User = mongoose.model("user");
const Product = mongoose.model("product");
const Cart = mongoose.model("cart");

const validate = (data) => {
  let errors = {};
  if (data.quantity === "") errors.quantity = "Server error: Can't be empty";
  // if (data.cover === '') errors.cover = "Can't be empty";
  const isValid = Object.keys(errors).length === 0;

  return { errors, isValid };
};

module.exports = (app) => {
  app.post("/api/carts", async (req, res) => {
    const { errors, isValid } = validate(req.body);

    const {
      title,
      slug,
      image,
      price,
      quantity,
      total,
      productid,
      userid,
    } = req.body.data;

    console.log("Cart req.body:", req.body.data);

    //if (isValid) {
    //try {

    const cartData = new Cart({
      title,
      slug,
      image,
      price,
      quantity,
      total,
      productid,
      userid,
    });

    await cartData.save();

    res.json(cartData); // <-- very important to use!

    // console.log("Cart:", cartData);

    //} catch (err) {
    //	res.status(422).send(err);
    //}

    //} else {

    //	res.status(400).json({ errors });

    //}
  });

  // Fetch All Cart Items
  app.get("/api/carts", async (req, res) => {
    await Cart.find({}).exec(function (err, data) {
      if (err) console.error(err);

      res.json(data);
    });
  });

  // Fetch Cart Items By User ID
  app.get("/api/carts/:_user", async (req, res) => {
    const { _user } = req.params;
    // console.log("req.params", req.params);

    await Cart.find({
      userid: new mongoose.Types.ObjectId(_user),
    }).exec(function (err, data) {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json(data);
    });
  });

  // Delete Cart Item By Product Id
  app.delete("/api/carts/:id", async (req, res) => {
    let cid = req.params.id;

    console.log("Cart Product ID to delete:", cid);

    await Cart.findOneAndRemove(
      {
        _id: new mongoose.Types.ObjectId(cid),
      },
      (err, docs) => {
        if (err) console.error(err);
        console.log("Product Deleted successfully", docs);
      }
    ).exec(function (err, data) {
      if (err) console.error(err);
      res.json(data);
    });
  });
};
