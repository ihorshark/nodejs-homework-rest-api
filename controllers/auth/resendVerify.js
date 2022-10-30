const { User } = require("../../models/user");

const {
  RequestError,
  sendMail,
  createVerificationEmail,
} = require("../../helpers");

const resendVerify = async (req, res) => {
  const { email } = req.body;
  const user = User.findOne({ email });
  if (!email) {
    throw RequestError(404, "Email not found");
  }

  const mail = createVerificationEmail(email, user.verificationToken);
  await sendMail(mail);

  res.json({
    message: "Verification email resend",
  });
};

module.exports = resendVerify;
