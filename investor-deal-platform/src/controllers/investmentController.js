const Deal = require("../models/Deal");
const Investment = require("../models/Investment");

const investInDeal = async (req, res) => {
  try {
    const { dealId, amount } = req.body;

    const deal = await Deal.findById(dealId);

    if (!deal) {
      return res.status(404).json({
        message: "Deal not found",
      });
    }

    if (amount < deal.minInvestment || amount > deal.maxInvestment) {
      return res.status(400).json({
        message: "Invalid investment amount",
      });
    }

    const remaining = deal.targetAmount - deal.currentRaisedAmount;

    if (amount > remaining) {
      return res.status(400).json({
        message: "Investment exceeds target amount",
      });
    }

    deal.currentRaisedAmount += amount;

    if (deal.currentRaisedAmount >= deal.targetAmount) {
      deal.status = "Closed";
    } else {
      deal.status = "Partially Filled";
    }

    await deal.save();

    const investment = await Investment.create({
      investorId: req.user.id,
      dealId,
      amount,
    });

    res.status(201).json({
      success: true,
      investment,
      currentRaised: deal.currentRaisedAmount,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  investInDeal,
};
