import { useForm } from "react-hook-form";
import { useState } from "react";
import { alta, login } from "../helpers/fetchFormApi";
import { useNavigate } from "react-router-dom";
import logochico from "../assets/img/LogoChico.jpeg";
import { Link } from "react-router-dom";

const FormScreen = () => {
  const {
    register,
    formState: { errors },
    watch,
    reset,
    handleSubmit,
  } = useForm();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    const usuarioConRol = { ...data, rol: "USER_ROL" };
    const respuestaAlta = await alta(usuarioConRol);

    if (respuestaAlta?.errors) {
      setLoading(false);
      setMessage(respuestaAlta.errors[0].msg);
      return;
    }

    const respuestaLogin = await login(data.email, data.password);

    if (respuestaLogin?.errors) {
      setLoading(false);
      setMessage(respuestaLogin.errors[0].msg);
      return;
    }

    setLoading(false);
    navigate("/login");
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="login-card shadow-lg p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="text-center mb-4">
          <img
            src={logochico}
            alt="Logo"
            className="img-fluid mb-3 shadow w-24"
          />
          <h3 className="fw-bold">Registro</h3>
          <p className="text-muted">Crea tu cuenta para continuar</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label fw-bold">Nombre</label>
            <input
              type="text"
              className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
              {...register("nombre", {
                required: "El nombre es obligatorio",
                maxLength: 15,
              })}
            />
            {errors.nombre && (
              <div className="invalid-feedback">{errors.nombre.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Correo</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Correo inválido",
                },
              })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Contraseña</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              {...register("password", {
                required: "La contraseña es obligatoria",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d).{8,16}$/,
                  message:
                    "Debe tener 8-16 caracteres, una mayúscula y un número",
                },
              })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          <div className="d-grid my-4">
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrarse"}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="mb-0">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-primary">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormScreen;
