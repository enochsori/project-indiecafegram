const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const cafes = require("./data/cafes.json");
const conversations = require("./data/converstations.json");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    console.log("Connected!");
    const db = client.db("indiecafegram");
    
    await db.collection("cafes").insertMany(cafes);
    await db.collection("conversations").insertMany(conversations);

    res.status(201).json({ status: 201, message: "done" });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }

  client.close();
  console.log("disconnected!");
};

module.exports = {
  batchImport,
};
