function errorHandler(err, req, res, next) {
  
    if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "Error usuario no autorizado" });
  }
  
  if (err.name === "ValidationError") {
    return res.status(401).json({ message: "Error de nombre" });
  }

  return res.status(500).json({ message: "Error en el servidor" });
}
