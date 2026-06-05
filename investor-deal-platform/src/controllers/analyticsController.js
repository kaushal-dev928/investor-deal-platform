const Deal = require("../models/Deal");
const Investment = require("../models/Investment");

const getSummary = async (req, res) => {
  try {
    const totalInvestments = await Investment.countDocuments();

    const totalAmount = await Investment.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const totalDeals = await Deal.countDocuments({
      isDeleted: false,
    });

    res.json({
      totalDeals,
      totalInvestments,
      totalAmountRaised: totalAmount[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getSummary,
};
