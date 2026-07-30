const express = require("express");
const router = express.Router();

const DocumentoController = require(
  "../controllers/documentocontroller"
);

router.post(
  "/registrardocumento",
  DocumentoController.registrarDocumento
);

router.get(
  "/listardocumentos",
  DocumentoController.listarDocumentos
);

router.get(
  "/consultardocumento/:id",
  DocumentoController.consultarDocumentoPorId
);

module.exports = router;