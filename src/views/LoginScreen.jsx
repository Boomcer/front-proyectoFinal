import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../helpers/fetchApi.js"
import '../css/LoginScreen.css';
import { Link } from "react-router-dom";

const LoginScreen = () => {

    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [formulario, setFormulario] = useState({
      email: "",
      password: "",
    });

    const handleChange = (e) =>{
      setFormulario({...formulario, [e.target.name]: e.target.value});
    };
    
  
    const login = (e) => {
    e.preventDefault();
     auth(formulario.email, formulario.password).then((response) => {
      if (response?.token) {
        localStorage.setItem("token", JSON.stringify(response.token));
        localStorage.setItem("uid", JSON.stringify(response.uid));
        navigate("/");
      }else {
        setMessage(response);
      }
     });  
    };
  
    return (
        <div className="container">
        <div className="row justify-content-center align-items-center">
        <div className="col">
          <div className="card img-card">
            <img 
              src="" 
              alt="inicio"
              className="card-img-top"
            />
            <div className="card-body">
              <h3 className="card-title mb-3 text-center">Iniciar Sesión</h3>
              
              <form onSubmit={login}>
                
                <div className="col">
                  <label className="form-label">Correo</label>
                  <input
                  className="form-control"
                    type="email"
                    value={formulario.email}
                    onChange={handleChange}
                    name="email"
                    placeholder="name@example.com"
                    required={true}
                  />
                </div>
                
                <div className="col">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    value={formulario.password}
                    onChange={handleChange}
                    name="password"
                    required={true}
                  />
                </div>

                <div className="d-grid my-3">
                  <button className="btn btn-warning">Iniciar</button>
                </div>
                
                <div className="alert alert-info" role="alert">
                Aun no eres cliente?  <Link to="/registro" href="#" className="alert-link">Registrate aqui</Link>, y comienza tu experiencia.
                </div>
            </form>
            </div>
            {message && (
              <div className="alert alert-danger mt-2" role="alert">
                  {message.msg}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default LoginScreen;
