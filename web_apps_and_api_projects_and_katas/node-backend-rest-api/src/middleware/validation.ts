const validateCardId = async (req, res, next) => {
  const { cardId } = req.params;
  if (!cardId) {
    return next();
  }

  const isValidCardId = /^card[0-9]{3}$/.test(cardId);

  if (!isValidCardId) {
    return res.status(400).send({
      errorMessage: `Invalid cardId supplied: ${cardId}`,
    });
  }

  return next();
};

const validateSizeId = async (req, res, next) => {
  const { sizeId } = req.params;
  const validSizeIds = ["sm", "md", "lg", "gt"];
  if (!sizeId) {
    return next();
  }
  if (!validSizeIds.includes(sizeId)) {
    return res.status(400).send({
      errorMessage: `Invalid sizeId supplied: ${sizeId}`,
    });
  }
  return next();
};

export { validateCardId, validateSizeId };
