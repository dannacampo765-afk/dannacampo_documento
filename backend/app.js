require("dotenv").config();

const express = require("express");
const cors = require("cors");

const Documento = require("./routers/documentorouter");

const app = express();
const puerto = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json({ limit: "1mb" }));
// Rutas
app.use("/apidocumentos", Documento);

app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
  });
});

app.use((error, req, res, next) => {
  console.log("Error general del servidor:", error);

  res.status(500).json({
    error: "Error interno del servidor",
  });
});

app.listen(puerto, () => {
  console.log(`Servidor corriendo en http://localhost:${puerto}`);
});