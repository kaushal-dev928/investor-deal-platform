const Deal = require("../models/Deal");

const updateDealStatus = require("../utils/updateDealStatus");

const InvestorPreference = require("../models/InvestorPreference");

const calculateMatchScore = require("../services/matchingService");

const createDeal = async (req, res) => {
  try {
    req.body.status = "Open";

    const dealData = updateDealStatus(req.body);

    const deal = await Deal.create(dealData);

    res.status(201).json({
      success: true,
      deal,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllDeals = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = 5;

    const skip = (page - 1) * limit;

    const deals = await Deal.find({
      isDeleted: false,
    })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: deals.length,
      deals,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getDealById = async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);

    if (!deal || deal.isDeleted) {
      return res.status(404).json({
        message: "Deal not found",
      });
    }

    res.status(200).json({
      success: true,
      deal,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateDeal = async (req, res) => {
  try {
    const deal = await Deal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      deal,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteDeal = async (req, res) => {
  try {
    const deal = await Deal.findByIdAndUpdate(
      req.params.id,
      {
        isDeleted: true,
      },
      {
        new: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Deal deleted successfully",
      deal,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getRecommendedDeals = async (req, res) => {
  try {
    const preference = await InvestorPreference.findOne({
      investorId: req.user.id,
    });

    if (!preference) {
      return res.status(404).json({
        message: "Investor preferences not found",
      });
    }

    const deals = await Deal.find({
      isDeleted: false,
      status: {
        $ne: "Closed",
      },
    });

    const scoredDeals = deals.map((deal) => ({
      ...deal.toObject(),
      matchScore: calculateMatchScore(deal, preference),
    }));

    scoredDeals.sort((a, b) => b.matchScore - a.matchScore);

    res.status(200).json({
      success: true,
      count: scoredDeals.length,
      deals: scoredDeals,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createDeal,
  getAllDeals,
  getDealById,
  updateDeal,
  deleteDeal,
  getRecommendedDeals,
};
