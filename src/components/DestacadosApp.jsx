import React, { useEffect, useState } from 'react'
import {getProducts} from '../helpers/ApiTraerProductos'

const DestacadosApp = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() =>{
        async function cargarProductos() {
            const productosData = await getProducts();
            setProductos(productosData);
        }
        cargarProductos();
    }, []);
   

  return (
    <div>
        <h1>Destacados</h1>
        <div id="carouselExampleDark" className="carousel carousel-dark slide">
        
        <div className="carousel-inner">

            { productos.map((producto, index) => (
                <div key={producto._id} className={`carousel-item ${index === 0 ? 'active': ""}`}
                data-bs-interval="10000">
                    <div className="">
                        <section className=''>
                            <img src={producto.img}
                            alt="imagen" 
                            className=''/>
                        </section>
                        <section className=''>
                            <h3>{producto.nombre}</h3>
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