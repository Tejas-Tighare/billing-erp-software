export const tenantMiddleware = (req, res, next) => {
  if (!req.user?.storeId) {
    return res.status(403).json({
      success: false,
      message: "Store access denied"
    });
  }

  req.storeId = req.user.storeId;

  next();
};