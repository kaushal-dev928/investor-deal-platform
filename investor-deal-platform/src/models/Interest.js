const mongoose = require("mongoose");

const interestSchema = new mongoose.Schema(
  {
    investorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    dealId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deal",
      required: true,
    },

    interestedAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

investmentSchema.index({
  investorId: 1,
});

investmentSchema.index({
  dealId: 1,
});

module.exports = mongoose.model("Interest", interestSchema);
