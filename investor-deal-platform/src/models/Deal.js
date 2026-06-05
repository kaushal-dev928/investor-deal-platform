const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },

    industry: {
      type: String,
      required: true,
    },

    investmentRequired: {
      type: Number,
      required: true,
    },

    expectedROI: {
      type: Number,
      required: true,
    },

    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Open", "Partially Filled", "Closed"],
      default: "Open",
    },

    description: String,

    minInvestment: Number,

    maxInvestment: Number,

    targetAmount: Number,

    currentRaisedAmount: {
      type: Number,
      default: 0,
    },

    closingDate: Date,

    tags: [String],

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

dealSchema.index({
  industry: 1,
});

dealSchema.index({
  riskLevel: 1,
});

dealSchema.index({
  expectedROI: 1,
});

module.exports = mongoose.model("Deal", dealSchema);
