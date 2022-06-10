"use strict";

const express = require("express");
const morgan = require("morgan");
const {
  getCurrentUser,
  registerNewUser,
  getCafes,
  getCommentsById,
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
  .get("/api/users/:id", getCurrentUser)
  // Get comments based on id
  .get("/api/comment/:_id", getCommentsById)

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Register a new user into user database
  .post("/api/new-user", registerNewUser)

  // endpoint for batch initial cafe data
  .post("/api/add-all-cafes", batchImport)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
