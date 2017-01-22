function requireAuth(req, res, next) {
  // req.user is set in passport deserializer
  if (req.session && req.user && req.user.id) {
    return next();
  }
  res.status(401).send();
}

module.exports = {
  requireAuth
};