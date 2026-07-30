import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

class DocumentoService {
  async registrarDocumento(data) {
    const respuesta = await api.post(
      "/apidocumentos/registrardocumento",
      data
    );

    return respuesta.data;
  }

  async listarDocumentos() {
    const respuesta = await api.get(
      "/apidocumentos/listardocumentos"
    );

    return respuesta.data;
  }

  async consultarDocumentoPorId(id) {
    const respuesta = await api.get(
      `/apidocumentos/consultardocumento/${id}`
    );

    return respuesta.data;
  }
}

export default new DocumentoService();