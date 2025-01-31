import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../helpers/fetchApi.js";
import img from '../assets/img/LogoGrande.jpeg';
import { Link } from "react-router-dom";

const LoginScreen = () => {
  const navigate = useNavigate();

  // Declarar useState para mensajes
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [formulario, setFormulario] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef(null);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    if (password.length < 8 || password.length > 16) {
      return "La contraseña debe tener entre 8 y 16 caracteres.";
    }
    if (!/[A-Z]/.test(password)) {
      return "La contraseña debe contener al menos una letra mayúscula.";
    }
    if (!/\d/.test(password)) {
      return "La contraseña debe contener al menos un número.";
    }
    return null;
  };

  const login = (e) => {
    e.preventDefault();

    const passwordError = validatePassword(formulario.password);
    if (passwordError) {
      setError(passwordError);
      setFormulario({ ...formulario, password: "" });
      passwordRef.current.focus();
      return;
    }

    auth(formulario.email, formulario.password).then((response) => {
      if (response?.token) {
        // Guardar el token como una cadena normal (sin stringify)
        localStorage.setItem("token", JSON.stringify(response.token));
        // Guardar el uid como una cadena normal (sin stringify)
        localStorage.setItem("uid", response.usuario.uid);

        // Guardar favoritos y carrito con JSON.stringify() porque son arrays u objetos
        localStorage.setItem("favoritos", JSON.stringify(response.usuario.favoritos || []));
        localStorage.setItem("carrito", JSON.stringify(response.usuario.carrito || []));

        console.log(response);
        navigate("/");
      } else {
        // Configurar mensaje en caso de error
        setError(null);
        setMessage(response); // Mostrar el mensaje de error
      }
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center min-vh-100">
      <div className="login-card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="text-center mb-4">
          <img 
            src="https://via.placeholder.com/100" 
            alt="Logo"
            className="img-fluid rounded-circle mb-3"
          />
          <h3 className="fw-bold">Bienvenido de nuevo</h3>
          <p className="text-muted">Inicia sesión para continuar</p>
        </div>

        <form onSubmit={login}>
          <div className="mb-3">
            <label className="form-label fw-bold">Correo</label>
            <input
              type="email"
              className="form-control"
              value={formulario.email}
              onChange={handleChange}
              name="email"
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="mb-3">
            <label 
              className="form-label fw-bold d-flex justify-content-between align-items-center"
              title="Requerimientos: Entre 8 y 16 caracteres, al menos 1 Mayúscula y 1 número"
            >
              Contraseña
              <span
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
                title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              value={formulario.password}
              onChange={handleChange}
              name="password"
              ref={passwordRef}
              placeholder="********"
              required
            />
            {/* Mensaje de error de conexión */}
            {message && (
              <div className="alert alert-danger mt-2" role="alert">
                {message.msg}
              </div>
            )}
            {error && (
            <div className="alert alert-danger mt-2" role="alert">
              {error}
            </div>
          )}
          </div>

          

          <div className="d-grid my-4">
            <button type="submit" className="btn btn-primary btn-lg">
              Iniciar sesión
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="mb-0">¿No tienes cuenta? <Link to="/registro" className="text-primary">Regístrate aquí</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen; 