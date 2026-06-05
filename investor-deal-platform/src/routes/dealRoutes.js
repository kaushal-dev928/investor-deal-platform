const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const authorize = require("../middleware/roles");

const {
  createDeal,
  getAllDeals,
  getDealById,
  updateDeal,
  deleteDeal,
  getRecommendedDeals,
} = require("../controllers/dealController");

router.post("/", auth, authorize("Corporate"), createDeal);

router.get("/", getAllDeals);

router.get("/recommended", auth, authorize("Investor"), getRecommendedDeals);

router.get("/:id", getDealById);

router.put("/:id", auth, authorize("Corporate"), updateDeal);

router.delete("/:id", auth, authorize("Corporate"), deleteDeal);



module.exports = router;
