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
  const { _id } = req.params;
  console.log(_id);

  try {
    await client.connect();
    const db = await client.db("indiecafegram");
    const data = await db.collection("users").find({ _id }).toArray();

    client.close();
    console.log("Disconnected");

    res.status(200).json({
      status: 200,
      data,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err,
    });
  }
};

// Register a new user into the database
const registerNewUser = async (req, res) => {
  console.log(req.body);
  const { _id } = req.body;
  try {
    await client.connect();
    const db = await client.db("indiecafegram");
    await db.collection("users").insertOne(req.body);
    const data = await db.collection("users").find({ _id }).toArray();

    res.status(200).json({ status: 200, message: "request complete", data });

    client.close();
    console.log("Disconnected");
  } catch (err) {
    res.status(500).json({ status: 500, message: err });
  }
};

// Get all cafes for display
const getCafes = async (req, res) => {
  try {
    await client.connect();
    console.log("Connected");

    const db = await client.db("indiecafegram");
    const data = await db.collection("cafes").find().toArray();

    res.status(200).json({ status: 200, data, message: "Request completed" });

    client.close();
    console.log("Disconnected");
  } catch (err) {
    res.status(500).json({ status: 500, message: err });
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

    client.close();
    console.log("Disconnected");

    res.status(200).json({ status: 200, data });
  } catch (err) {
    res.status(500).json({ status: 400, message: err.message });
  }
};

// Update user comment
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

    client.close();
    console.log("Disconnected");

    // check the update result

    res.status(200).json({ status: 200, message: "Update completed" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

// ------------------------------------------------------
// ------------------------------------------------------
// Get all converstaions
const getConversations = async (req, res) => {
  try {
    await client.connect();
    console.log("Connected");

    const db = await client.db("indiecafegram");
    const data = await db.collection("conversations").find().toArray();

    res.status(200).json({ status: 200, data, message: "Request complete" });

    client.close();
    console.log("Disconnected");
  } catch (err) {
    res.status(500).json({ status: 500, message: err });
  }
};

// Get conversation based on cafe _id
const getConversation = async (req, res) => {
  const { _id } = req.params;
  console.log(_id);
  try {
    await client.connect();
    console.log("Connected");

    const db = await client.db("indiecafegram");
    const data = await db.collection("conversations").find({ _id }).toArray();
    res.status(200).json({ status: 200, data, message: "Request complete" });

    client.close();
    console.log("Disconnected");
  } catch (err) {
    res.status(500).json({ status: 500, message: err });
  }
};

// Add chat message to the converstions
const addChatMessage = async (req, res) => {
  const { _id, name, text, createdAt } = req.body;
  try {
    await client.connect();
    console.log("Connected");
    const db = await client.db("indiecafegram");
    const result = await db
      .collection("conversations")
      .updateOne({ _id }, { $addToSet: { text: { [name]: text, createdAt } } });
    console.log(result);
    res.status(200).json({ status: 200, message: "Request completed" });

    client.close();
    console.log("Disconnected");
  } catch (err) {
    res.status(500).json({ status: 500, message: err });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  const { _id, name } = req.body;
  console.log(_id, name);
  try {
    await client.connect();
    console.log("Connected");

    const query = { _id };
    const newValue = { $set: { name } };
    const db = await client.db("indiecafegram");
    const result = await db.collection("users").updateOne(query, newValue);
    console.log(result);
    const data = await db.collection("users").find(query).toArray();
    console.log(data);

    client.close();
    console.log("Disconnected");

    res.status(200).json({ status: 200, data });
  } catch (err) {
    res.status(500).json({ status: 500, message: err });
  }
};

// Add new cafe
const addCafé = async (req, res) => {
  const { name, phone, webSite, address, _id } = req.body;
  const randomNumber = Math.floor(Math.random() * 41 + 1);
  const imgSrc = `/images/0${randomNumber}.jpeg`;

  const newValue = { name, _id, phone, imgSrc, webSite, address };

  try {
    await client.connect();
    console.log("Connected");

    const db = await client.db("indiecafegram");
    const result = await db.collection("cafes").insert(newValue);
    const data = await db.collection("cafes").find({ _id }).toArray();

    client.close();
    console.log("Disconnected");

    console.log(result);

    res.status(200).json({ status: 200, message: "Request completed", data });
  } catch (err) {
    res.status(500).json({ status: 500, message: err });
  }
};

module.exports = {
  getCurrentUser,
  registerNewUser,
  getCafes,
  getCommentsById,
  addComment,
  getConversation,
  getConversations,
  addChatMessage,
  updateProfile,
  addCafé,
};
