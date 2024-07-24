const expressJwt = require("express-jwt");

function authJwt() {
  //Enlace de token
  const secret = process.env.secret;
  return expressJwt({
    secret,
    algorithms: ["HS256"],
  })
}

module.exports = authJwt;
