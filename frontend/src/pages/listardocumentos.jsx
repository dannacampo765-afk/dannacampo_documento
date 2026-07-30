import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import documentoService from "../services/documentoservices";

function ListarDocumentos() {
  const [documentos, setDocumentos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarDocumentos();
  }, []);

  const cargarDocumentos = async () => {
    try {
      const respuesta =
        await documentoService.listarDocumentos();

      setDocumentos(respuesta);
    } catch (error) {
      setError("No fue posible consultar los documentos");
    } finally {
      setCargando(false);
    }
  };

  if (cargando) {
    return <main><p>Cargando documentos...</p></main>;
  }

  return (
    <main>
      <hr />
      <h1>Textos procesados</h1>

      {error && <p className="mensaje-error">{error}</p>}

      {!error && documentos.length === 0 && (
        <p>Todavía no hay documentos registrados.</p>
      )}

      <section className="lista-documentos">
        {documentos.map((documento) => (
          <article key={documento.id}>
            <div>
              <h2>{documento.titulo}</h2>

              <p>
                {new Date(
                  documento.createdAt
                ).toLocaleString("es-CO")}
              </p>

              <span className={`estado ${documento.estado}`}>
                {documento.estado}
              </span>
            </div>

            <Link to={`/documentos/${documento.id}`}>
              Consultar
            </Link>
          </article>
        ))}
      </section>
      <hr />
    </main>
  );
}

export default ListarDocumentos;