const updateDealStatus = (deal) => {
  const today = new Date();

  if (deal.currentRaisedAmount >= deal.targetAmount) {
    deal.status = "Closed";
  } else if (deal.currentRaisedAmount > 0) {
    deal.status = "Partially Filled";
  } else {
    deal.status = "Open";
  }

  if (today > deal.closingDate) {
    deal.status = "Closed";
  }

  return deal;
};

module.exports = updateDealStatus;
