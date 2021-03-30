export const responseHeaders = (req, res, next) => {
  res.set("Cache-Control", "public, max-age=3600, must-revalidate");
  return next();
};
