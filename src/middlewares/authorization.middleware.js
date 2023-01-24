module.exports = async (req, res, next) => {
  let user = req.user;
  try {
    if (user.type === "user") return res.status(403).send("Permission Denied");
    next();
  } catch (e) {}
};
