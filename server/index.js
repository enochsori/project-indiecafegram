"use strict";

const express = require("express");
const morgan = require("morgan");
const {
  getCurrentUser,
  registerNewUser,
  getCafes,
  getCommentsById,
  addComment,
  getConversation,
  getConversations,
  addChatMessage,
  updateProfile,
} = require("./handler");
const { batchImport } = require("./batchImport");

const PORT = 8000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // test endpoint
  .get("/api/test", (req, res) => {
    res.send("node server");
  })

  // Get all the cafes
  .get("/api/cafes", getCafes)

  // Get current user info
  .get("/api/users/:_id", getCurrentUser)

  // Get comments based on id
  .get("/api/comment/:_id", getCommentsById)

  // Get all converstaions
  .get("/api/conversations", getConversations)
  // Get converstaion based on cafe id
  .get("/api/conversations/:_id", getConversation)

  // Register a new user into user database
  .post("/api/new-user", registerNewUser)

  // Register initial data(cafes, converstaions)
  .post("/api/initial-data", batchImport)

  // Update user comment
  .patch("/api/add-comment", addComment)

  // Update new chat message
  .patch("/api/add-chat-message", addChatMessage)

  // Update user profile
  .patch("/api/edit-profile", updateProfile)

  // This is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
