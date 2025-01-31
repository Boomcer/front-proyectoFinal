import { useForm } from "react-hook-form";
import { useState } from "react";
import { alta, login } from "../helpers/fetchFormApi";
import { useNavigate } from "react-router-dom";

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
    console.log("Datos enviados:", data);
    setLoading(true);

    // Asignar rol por defecto
    const usuarioConRol = { ...data, rol: "USER_ROL" };

    // Crear usuario
    const respuestaAlta = await alta(usuarioConRol);

    if (respuestaAlta?.errors) {
      setLoading(false);
      setMessage(respuestaAlta.errors[0].msg);
      return;
    }

    // Inicio de sesión automático
    const respuestaLogin = await login(data.email, data.password);

    if (respuestaLogin?.errors) {
      setLoading(false);
      setMessage(respuestaLogin.errors[0].msg);
      return;
    }

    // Redirigir al login
    setLoading(false);
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div>
        <h2 className="mb-4">Formulario</h2>
        <p>Nombre: {watch("nombre")}</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-light p-4 rounded shadow"
      >
        {/* Campo Nombre */}
        <div className="mb-3 d-flex align-items-center">
          <label className="form-label me-3">Nombre</label>
          <input
            type="text"
            className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
            {...register("nombre", {
              required: true,
              maxLength: 15,
            })}
          />
          {errors.nombre?.type === "required" && (
            <div className="invalid-feedback">El campo nombre es requerido</div>
          )}
          {errors.nombre?.type === "maxLength" && (
            <div className="invalid-feedback">
              El campo nombre debe tener menos de 15 caracteres
            </div>
          )}
        </div>

        {/* Campo Email */}
        <div className="mb-3 d-flex align-items-center">
          <label className="form-label me-3">Email</label>
          <input
            type="text"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
            })}
          />
          {errors.email?.type === "pattern" && (
            <div className="invalid-feedback">
              El formato del email es incorrecto
            </div>
          )}
        </div>

        {/* Campo Password */}
        <div className="mb-3 d-flex align-items-center">
          <label className="form-label me-3">Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            {...register("password", {
              required: true,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
            })}
          />
          {errors.email?.type === "pattern" && (
            <div className="invalid-feedback">
              El formato de la contraseña es incorrecto
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading ? true : false}
          className={loading ? "btn btn-primary disabled" : "btn btn-primary"}
        >
          {loading ? "Cargando..." : "Enviar"}
        </button>
      </form>
      {message && (
        <div className="alert alert-danger mx-2" role="alert">
          {message}
        </div>
      )}
    </div>
  );
};

export default FormScreen;
