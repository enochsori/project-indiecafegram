"use strict";

const express = require("express");
const morgan = require("morgan");
const { getCurrentUser, registerNewUser } = require("./handler");

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

  // Get current user info
  .get("/api/users/:id", getCurrentUser)

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Register a new user into user database
  .post("/api/new-user", registerNewUser)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
