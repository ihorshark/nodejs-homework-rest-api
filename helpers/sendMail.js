const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const sendMail = async mail => {
  const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465, // 25, 465, 2255
    secure: true,
    auth: {
      user: "ihor.sharkadi@meta.ua",
      pass: META_PASSWORD,
    },
  };

  const transport = nodemailer.createTransport(nodemailerConfig);

  const mailForSend = {
    ...mail,
    from: "ihor.sharkadi@meta.ua",
  };

  transport
    .sendMail(mailForSend)
    .then(() => console.log("Email send success"))
    .catch(error => console.log(error.message));
};

module.exports = sendMail;
