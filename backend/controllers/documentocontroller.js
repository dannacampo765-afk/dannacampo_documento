const documentoService = require("../services/documentoservice");

class DocumentoController {
  async registrarDocumento(req, res) {
    try {
      const { titulo, texto_original } = req.body;

      if (!titulo || !texto_original) {
        return res.status(400).json({
          error: "El título y el texto son obligatorios",
        });
      }

      const nuevoDocumento =
        await documentoService.registrarDocumento({
          titulo: titulo.trim(),
          texto_original: texto_original.trim(),
        });

      return res.status(201).json({
        mensaje: "Documento registrado correctamente",
        documento: nuevoDocumento,
      });
    } catch (error) {
      console.log("Error en registrarDocumento:", error);

      return res.status(500).json({
        error: "Error al registrar el documento",
      });
    }
  }

  async listarDocumentos(req, res) {
    try {
      const documentos = await documentoService.listarDocumentos();

      return res.status(200).json(documentos);
    } catch (error) {
      console.log("Error en listarDocumentos:", error);

      return res.status(500).json({
        error: "Error al listar los documentos",
      });
    }
  }

  async consultarDocumentoPorId(req, res) {
    try {
      const documento =
        await documentoService.consultarDocumentoPorId(req.params.id);

      if (!documento) {
        return res.status(404).json({
          error: "Documento no encontrado",
        });
      }

      return res.status(200).json(documento);
    } catch (error) {
      console.log("Error en consultarDocumentoPorId:", error);

      return res.status(500).json({
        error: "Error al consultar el documento",
      });
    }
  }
}

module.exports = new DocumentoController();