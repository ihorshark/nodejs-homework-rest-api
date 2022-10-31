const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

const verify = async (req, res) => {
  const { verificationToken } = req.params;

  const user = User.findOne({ verificationToken });
  if (!user) {
    throw RequestError(404);
  }
  await User.findByIdAndUpdate({ verify: true, verificationToken: "" });
  res.json({
    message: "Email verification succsess",
  });
};

module.exports = verify;
