const InvestorPreference = require("../models/InvestorPreference");

const savePreference = async (req, res) => {
  try {
    const existing = await InvestorPreference.findOne({
      investorId: req.user.id,
    });

    if (existing) {
      const updated = await InvestorPreference.findOneAndUpdate(
        {
          investorId: req.user.id,
        },
        req.body,
        {
          new: true,
        },
      );

      return res.json(updated);
    }

    const preference = await InvestorPreference.create({
      ...req.body,
      investorId: req.user.id,
    });

    res.status(201).json(preference);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  savePreference,
};
