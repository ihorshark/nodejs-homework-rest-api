/*
1. Вилучає заголовок Authorization з req.headers.
2. Розділяє заголовок на 2 слова.
3. Якщо перше слово !== "Bearer" - викидає 401 помилку.
4. Перевіряє валідність токену. Якщо ні - викидає 401 помилку.
5. Шукає в базі користувача з таким id. Якщо немає - викидає 401 помилку. 
*/

const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { RequestError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    console.log(req.headers);
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw RequestError(401);
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user) {
        throw Error("Unauthorized");
      }
      next();
    } catch (error) {
      throw RequestError(401);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
