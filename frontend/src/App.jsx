import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Navigate, Route, Routes } from "react-router-dom";

import RegistrarDocumento from "./pages/registrardocumentos";
import ListarDocumentos from "./pages/listardocumentos";
import DetalleDocumento from "./pages/detallesdocumentos";

function App() {
  return (
    <>
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        expand="md"
        className="shadow-sm"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            Resumen IA
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navegacion-principal" />

          <Navbar.Collapse id="navegacion-principal">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Nuevo texto
              </Nav.Link>

              <Nav.Link as={Link} to="/documentos">
                Historial
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<RegistrarDocumento />} />

        <Route
          path="/documentos"
          element={<ListarDocumentos />}
        />

        <Route
          path="/documentos/:id"
          element={<DetalleDocumento />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;