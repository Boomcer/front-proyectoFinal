import { useForm } from "react-hook-form";
import { useState } from "react";
// import { alta } from "../helpers/fetchFormApi"; 

// import { useNavigate } from "react-router-dom"; 


 
const FormScreen = () => {

    const { register, formState: { errors }, watch, handleSubmit } = useForm();
    const [message, setMessage] = useState(null);


    // const formIn = (data, e) => {
    //     console.log(data);
    //     const { nombre, email, password, } = data;
    //     e.target[0].focus();
    // }

    const onSubmit = async (data) => {
        console.log('Datos enviados:', data);
        // const { nombre, email, password, rol} = data;
        const url = "https://backend-proyectofinal-rolling.onrender.com/api/usuarios";
    
        try {
          // Usando fetch para realizar la solicitud POST
          const response = await fetch(url , {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Convertimos el objeto de datos a JSON
          });
    
        //   Verificamos si la solicitud fue exitosa
        //   if (!response.ok) {
        //     throw new Error('Hubo un error al enviar los datos');
        //   }
    
          const responseData = await response.json(); // Obtenemos la respuesta de la API
          console.log('Respuesta de la API:', responseData);
          setMessage(responseData);
          
        } catch (error) {
          console.error('Error al enviar los datos:', error);
          message.msg
        }
      };
    

    return (
        <div className="container mt-5">
            <div >
            <h2 className="mb-4">Formulario</h2>
            <p>Nombre: {watch('nombre')}</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-light p-4 rounded shadow">

                {/* Campo Nombre */}
                <div className="mb-3 d-flex align-items-center">
                    <label className="form-label me-3">Nombre</label>
                    <input 
                        type="text" 
                        className={`form-control ${errors.nombre ? 'is-invalid' : ''}`} 
                        {...register('nombre', {
                            required: true,
                            maxLength: 15
                        })} 
                    />
                    {errors.nombre?.type === 'required' && <div className="invalid-feedback">El campo nombre es requerido</div>}
                    {errors.nombre?.type === 'maxLength' && <div className="invalid-feedback">El campo nombre debe tener menos de 15 caracteres</div>}
                </div>

                
                {/* Campo Email */}
                <div className="mb-3 d-flex align-items-center">
                    <label className="form-label me-3">Email</label>
                    <input 
                        type="text" 
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                        {...register('email', { 
                            required:true, 
                            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i })} 
                    />
                    {errors.email?.type === 'pattern' && <div className="invalid-feedback">El formato del email es incorrecto</div>}
                </div>

                {/* Campo password */}
                <div className="mb-3 d-flex align-items-center">
                    <label className="form-label me-3">Password</label>
                    <input 
                        type="password" 
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                        {...register('password', { 
                            required:true, 
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/ })} 
                    />
                    {errors.email?.type === 'pattern' && <div className="invalid-feedback">El formato de la contraseña es incorrecto</div>}
                </div>

                

                {/* Campo rol */}
                <div className="mb-3 d-flex align-items-center">
                    <label className="form-label me-3">Rol</label>
                    <select className="form-select" {...register('rol',{
                        required:true
                    })}>
                        <option value="ADMIN_ROL" >ADMIN_ROL</option>
                        <option value="USER_ROL">USER_ROL</option>
                    </select>
                </div>

                
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
    );
    {message && (
        <div className="alert alert-danger mx-2" role="alert">
          {message.msg}
        </div>
      )}

}

export default FormScreen;

