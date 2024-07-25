const { expressjwt } = require("express-jwt");

function authJwt() {
  // Obtiene la clave secreta y la URL de la API desde variables de entorno
  const secret = process.env.secret;
  const api = process.env.URL;
  // Configura el middleware de autenticación con JWT
  return expressjwt({
    // Clave secreta para firmar y verificar los tokens
    secret,
    // Algoritmo de firma utilizado (en este caso, HS256)
    algorithms: ["HS256"],
    // Excluye ciertas rutas de la autenticación
    // isRevoked: isRevoked
  }).unless({
    // Rutas de autenticación para usuarios admin
    path: [
      //Rutas de autenticacion
      { url: /\/APP\/users(.*)/ , methods:['GET', 'OPTIONS']},
      { url: /\/APP\/products(.*)/ , methods:['GET', 'OPTIONS'] },
      { url: /\/APP\/categorys(.*)/ , methods:['GET', 'OPTIONS'] }

      ]
  })
  
}


// Función para restringir el registro de administradores (comentada en este ejemplo)
// async function isRevoked(req, payload,done) {
//   if (!payload.isAdmin) {
//     done(null,true)
//   }

//   done()
// }


// Exporta la función authJwt como un módulo
module.exports = authJwt;
