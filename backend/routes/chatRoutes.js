const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const { getStreamToken } = require("../controllers/chatController");

const chatRoutes = express.Router();

chatRoutes.get("/token", isLoggedIn, getStreamToken)

module.exports = chatRoutes;