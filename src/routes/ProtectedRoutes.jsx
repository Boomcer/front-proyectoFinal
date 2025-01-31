import { Link, Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, requiredRole }) => {
  const token = JSON.parse(localStorage.getItem("token")) || null;
  const user = JSON.parse(localStorage.getItem("user")) || null;

  // Verificar si el usuario está autenticado y tiene el rol requerido
  if (token && user && user.rol === requiredRole) {
    return children; // Permitir acceso
  } else {
    return (
      <>
        <div className="alert alert-info" role="alert">
          Esta sección es solo para Administradores.{" "}
          <Link to="/" className="alert-link">
            Haz clic aquí para seguir navegando
          </Link>
          , o inicia sesión como usuario registrado.
        </div>
        <Navigate to="/" replace /> {/* Redirigir a la página principal */}
      </>
    );
  }
};

export default ProtectedRoutes;