const bcrypt = require("bcryptjs");

const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, "Email not found");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw RequestError(401, "Wrong password");
  }
  const token = "321321.fdhfghlgh8fgh.jkhdfg7i";
  res.json({ token });
};

module.exports = login;
