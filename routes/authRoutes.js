// authRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");
const authController = require("../backend/controllers/authController");
const router = express.Router();

const SECRET_KEY = "vizmo-backend"; 

router.post("/login", authController.login);

router.post(
  "/register",
  authController.register
);

module.exports = router;
