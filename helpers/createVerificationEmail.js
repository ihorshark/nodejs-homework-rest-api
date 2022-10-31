const { BASE_URL } = process.env;

const createVerificationEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Email confirmation",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Press to confirm</a>`,
  };

  return mail;
};

module.exports = createVerificationEmail;
