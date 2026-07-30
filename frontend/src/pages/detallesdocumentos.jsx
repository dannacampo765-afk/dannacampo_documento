import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import documentoService from "../services/documentoservices";

function DetalleDocumento() {
  const { id } = useParams();

  const [documento, setDocumento] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    consultarDocumento();
  }, [id]);

  const consultarDocumento = async () => {
    try {
      const respuesta =
        await documentoService.consultarDocumentoPorId(id);

      setDocumento(respuesta);
    } catch (error) {
      setError(
        error.response?.data?.error ||
          "No fue posible consultar el documento"
      );
    } finally {
      setCargando(false);
    }
  };

  if (cargando) {
    return <main><p>Cargando documento...</p></main>;
  }

  if (error) {
    return (
      <main>
        <p className="mensaje-error">{error}</p>
        <Link to="/documentos">Volver al listado</Link>
      </main>
    );
  }

  return (
    <main>
      <Link to="/documentos">← Volver al listado</Link>

      <h1>{documento.titulo}</h1>

      <p>
        Fecha:{" "}
        {new Date(documento.createdAt).toLocaleString("es-CO")}
      </p>

      <p className={`estado ${documento.estado}`}>
        Estado: {documento.estado}
      </p>

      <section>
        <h2>Resumen generado</h2>
        <p>
          {documento.resumen ||
            "El resumen todavía no está disponible."}
        </p>
      </section>

      <section>
        <h2>Texto original</h2>
        <p className="texto-original">
          {documento.texto_original}
        </p>
      </section>

      {documento.mensaje_error && (
        <p className="mensaje-error">
          {documento.mensaje_error}
        </p>
      )}
    </main>
  );
}

export default DetalleDocumento;