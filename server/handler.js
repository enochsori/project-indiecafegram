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
  const { id } = req.params;

  try {
    await client.connect();
    const db = await client.db("indiecafegram");
    const data = await db.collection("users").find({ _id: id }).toArray();

    client.close();

    data.length === 0
      ? res.status(400).json({ status: 400 })
      : res.status(200).json({
          status: 200,
          data,
        });
  } catch (err) {
    res.status(500).json({
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
    const data = db.collection("users").find({ _id });

    res.status(200).json({ status: 200, message: "request complete", data });
  } catch (err) {
    res.status(500).json({ status: 404, message: err.message });
  }
  client.close();
};

// Get all cafes for display
const getCafes = async (req, res) => {
  try {
    await client.connect();
    console.log("Connected");

    const db = await client.db("indiecafegram");
    const data = await db.collection("cafes").find().toArray();
    console.log(data);

    data
      ? res
          .status(200)
          .json({ status: 200, data, message: "Request completed" })
      : res.status(400).json({ status: 400, message: "Request denied" });
  } catch (err) {
    res.status(404).json({ status: 400, message: "Server error" });
  }
};

// Get comments by id
const getCommentsById = async (req, res) => {
  const { _id } = req.params;
  console.log(_id);
  try {
    await client.connect();
    console.log("connected");
    const db = await client.db("indiecafegram");
    const data = await db.collection("cafes").find({ _id }).toArray();

    res.status(200).json({ status: 200, data });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

// Update user comment

// 2. update user collection with user _id
const addComment = async (req, res) => {
  const { cafeId, name, userId, newComment } = req.body;

  try {
    await client.connect();
    console.log("Connected");

    const db = await client.db("indiecafegram");
    // 1. update cafe collection with cafe _id
    console.log(name);
    const result = await db
      .collection("cafes")
      // $addToSet : push new data
      .updateOne(
        { _id: cafeId },
        { $addToSet: { comment: { [name]: newComment } } }
      );
    const data = await db.collection("cafes").find({ _id: cafeId }).toArray();
    console.log(data);

    // check the update result
    result.acknowledged
      ? res.status(200).json({ status: 200, message: "Update completed" })
      : res.status(400).json({ status: 400, message: "Failed to update" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
  console.log("Disconnected");
};
module.exports = {
  getCurrentUser,
  registerNewUser,
  getCafes,
  getCommentsById,
  addComment,
};
