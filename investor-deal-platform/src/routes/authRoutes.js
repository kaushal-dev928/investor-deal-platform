const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const { register, login } = require("../controllers/authController");

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),

    body("email").isEmail().withMessage("Valid email required"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  register,
);

router.post("/login", login);

module.exports = router;
