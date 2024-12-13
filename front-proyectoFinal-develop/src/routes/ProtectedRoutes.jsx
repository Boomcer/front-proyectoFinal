import { Link, Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("token")) || null;

  if (token) {
    return children;
  } else {
    return(
    <>
    <div className="alert alert-info" role="alert">
  Esta seccion es solo para Administradores <Link to="/" href="#" className="alert-link">click aqui para seguir navegando</Link>, o inicie sesion como usuario registrado.
</div>
  
    </>
    )
          
  }
};

export default ProtectedRoutes