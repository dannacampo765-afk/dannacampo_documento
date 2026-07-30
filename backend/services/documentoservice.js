const { Documento } = require("../models");
const iaService = require("./servicesIA");

class DocumentoService {
  async registrarDocumento(data) {
    let documento;

    try {
      documento = await Documento.create({
        titulo: data.titulo,
        texto_original: data.texto_original,
        estado: "procesando",
      });

      const resumen = await iaService.generarResumen(
        data.texto_original
      );

      await documento.update({
        resumen,
        estado: "completado",
        mensaje_error: null,
      });

      return documento;
    } catch (error) {
      if (documento) {
        await documento.update({
          estado: "error",
          mensaje_error: "No se pudo generar el resumen",
        });

        error.documentoId = documento.id;
      }

      console.log("Error al registrar documento:", error);
      throw error;
    }
  }

  async listarDocumentos() {
    try {
      return await Documento.findAll({
        attributes: ["id", "titulo", "estado", "createdAt"],
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      console.log("Error en listar documentos:", error);
      throw error;
    }
  }

  async consultarDocumentoPorId(id) {
    try {
      return await Documento.findByPk(id);
    } catch (error) {
      console.log("Error cuando se consultaba el documento:", error);
      throw error;
    }
  }
}

module.exports = new DocumentoService();