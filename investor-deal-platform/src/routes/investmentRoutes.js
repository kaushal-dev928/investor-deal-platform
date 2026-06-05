const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const authorize = require("../middleware/roles");

const { investInDeal } = require("../controllers/investmentController");

router.post("/", auth, authorize("Investor"), investInDeal);

module.exports = router;
