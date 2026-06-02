export function notFoundHandler(req, res) {
  res.status(404).json({ ok: false, mensaje: "Ruta no encontrada." });
}

export function errorHandler(err, req, res, next) {
  console.error("Error no controlado:", err);
  res.status(500).json({ ok: false, mensaje: "Error interno del servidor." });
}
