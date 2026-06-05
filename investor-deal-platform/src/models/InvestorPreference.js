const mongoose = require("mongoose");

const investorPreferenceSchema = new mongoose.Schema(
  {
    investorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    preferredIndustries: [
      {
        type: String,
      },
    ],

    riskAppetite: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    minBudget: Number,

    maxBudget: Number,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("InvestorPreference", investorPreferenceSchema);
