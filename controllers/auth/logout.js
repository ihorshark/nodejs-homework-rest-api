const { User } = require("../../models/user");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { tokrn: "" });
  res.json({ message: "Logout success" });
};

module.exports = logout;
