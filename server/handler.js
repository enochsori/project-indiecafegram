"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

// Get current user info from database
const getCurrentUser = async (req, res) => {
  const _id = req.params;
  try {
    await client.connect();
    const db = await client.db("indiecafegram");
    const data = await db.collection("users").find({ _id }).toArray();

    client.close();

    res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "something wrong",
    });
  }
};

// Register a new user into the database
const registerNewUser = async (req, res) => {
  try {
    await client.connect();
    const db = await client.db("indiecafegram");
    await db.collection("users").insertOne(req.body);
    res
      .status(200)
      .json({ status: 200, message: "request complete", data: req.body });
  } catch (err) {
    res.status(404).json({ status: 404, message: err.message });
  }
  client.close();
};

module.exports = { getCurrentUser, registerNewUser };
