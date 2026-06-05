const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const authorize = require("../middleware/roles");

const { savePreference } = require("../controllers/preferenceController");

router.post("/", auth, authorize("Investor"), savePreference);

module.exports = router;
