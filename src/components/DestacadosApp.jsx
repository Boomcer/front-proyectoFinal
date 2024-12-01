import React, { useEffect, useState } from 'react'
import {destacados} from '../helpers/apiProductos.js'
import '../css/destacados.css'

const DestacadosApp = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() =>{
        async function cargarProductos() {
            const productosData = await destacados();
            setProductos(productosData);
        }
        cargarProductos();
    }, []);
   

  return (
    <div>
        <h1 className="ps-5">Destacados</h1>
        <div id="carouselExampleDark" className="carousel carousel-dark slide">
        
        <div className="carousel-inner">

            { productos.map((producto, index) => (
                <div key={producto._id} className={`carousel-item ${index === 0 ? 'active': ""}`}
                data-bs-interval="10000">
                    <div className="d-flex justify-content-center container">
                        <section className=" container-img">
                            <img src={producto.img}
                            alt="imagen" 
                            className=''/>
                        </section>
                        <section className='align-self-center container-nombre'>
                            <p>{producto.nombre}</p>
                        </section>

                    </div>
                </div>
            ))}
            
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
        </div>

            {/* <ul>
                {productos.map((producto) => (
                    <li key={producto._id}>{producto.nombre}</li>
                ))}
            </ul> */}

    </div>
  )
}

export default DestacadosApp