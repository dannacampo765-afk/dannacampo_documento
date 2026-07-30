import { useState } from "react";
import { useNavigate } from "react-router-dom";
import documentoService from "../services/documentoservices";

function RegistrarDocumento() {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [textoOriginal, setTextoOriginal] = useState("");
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState("");

  const cargarArchivo = async (event) => {
    const archivo = event.target.files[0];

    if (!archivo) {
      return;
    }

    setError("");

    const esTexto =
      archivo.type === "text/plain" ||
      archivo.name.toLowerCase().endsWith(".txt");

    if (!esTexto) {
      setError("Solamente se permiten archivos de texto .txt");
      event.target.value = "";
      return;
    }

    if (archivo.size > 1024 * 1024) {
      setError("El archivo no puede superar 1 MB");
      event.target.value = "";
      return;
    }

    try {
      const contenido = await archivo.text();

      if (contenido.trim().length < 20) {
        setError("El archivo no contiene suficiente texto");
        return;
      }

      setTextoOriginal(contenido);

      if (!titulo.trim()) {
        setTitulo(archivo.name.replace(/\.txt$/i, ""));
      }
    } catch (error) {
      setError("No fue posible leer el archivo");
    }
  };

  const registrarDocumento = async (event) => {
    event.preventDefault();
    setError("");

    if (titulo.trim().length < 3) {
      setError("El título debe tener al menos 3 caracteres");
      return;
    }

    if (textoOriginal.trim().length < 20) {
      setError("El texto debe tener al menos 20 caracteres");
      return;
    }

    try {
      setProcesando(true);

      const respuesta =
        await documentoService.registrarDocumento({
          titulo: titulo.trim(),
          texto_original: textoOriginal.trim(),
        });

      navigate(`/documentos/${respuesta.documento.id}`);
    } catch (error) {
      setError(
        error.response?.data?.error ||
        "No fue posible procesar el documento"
      );
    } finally {
      setProcesando(false);
    }
  };

  return (
    <main>
      <h1>Analizar un texto</h1>
      <p>Ingresa el contenido para generar y guardar su resumen.</p>

      <form onSubmit={registrarDocumento}>
        <label htmlFor="titulo">Título</label>

        <input
          id="titulo"
          type="text"
          value={titulo}
          maxLength={150}
          onChange={(event) => setTitulo(event.target.value)}
          disabled={procesando}
          required
        />

        <label htmlFor="textoOriginal">Texto para analizar</label>
        <label htmlFor="archivoTexto">
          Cargar archivo de texto (opcional)
        </label>
        <input
          id="archivoTexto"
          type="file"
          accept=".txt,text/plain"
          onChange={cargarArchivo}
          disabled={procesando}
        />
        <textarea
          id="textoOriginal"
          value={textoOriginal}
          rows={14}
          maxLength={50000}
          onChange={(event) =>
            setTextoOriginal(event.target.value)
          }
          disabled={procesando}
          required
        />

        <small>{textoOriginal.length} de 50000 caracteres</small>

        {error && <p className="mensaje-error">{error}</p>}

        <button type="submit" disabled={procesando}>
          {procesando ? "Procesando texto..." : "Generar resumen"}
        </button>
      </form>
    </main>
  );
}

export default RegistrarDocumento;