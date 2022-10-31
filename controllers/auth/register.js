const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
// const uuidv4 = require("uuidv4");
const { v4: uuidv4 } = require("uuid");

const { User } = require("../../models/user");

const {
  RequestError,
  sendMail,
  createVerificationEmail,
} = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email is in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();
  const result = await User.create({
    name,
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = createVerificationEmail(email, verificationToken);

  await sendMail(mail);

  res.status(201).json({
    name: result.name,
    email: result.email,
    subscription: "starter",
    verificationToken: result.verificationToken,
  });
};

module.exports = register;
