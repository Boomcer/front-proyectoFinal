import React, { useEffect, useState } from "react";
import { destacados } from "../helpers/apiProductos.js";
import { Link } from "react-router-dom";
import "../css/destacados.css";

const DestacadosApp = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
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
        <div className="carousel-inner destacados-bg">
          {productos.map((producto, index) => (
            <div
              key={producto._id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              data-bs-interval="10000"
            >
              <div className="d-flex justify-content-center container">
                <section className=" container-img">
                  <Link className="nav-link" to={`/producto/${producto._id}`}>
                    <img src={producto.img} alt="imagen" className="" />
                  </Link>
                </section>
                <section className="align-self-center container-nombre">
                  <Link className="nav-link" to={`/producto/${producto._id}`}>
                    <p>{producto.nombre}</p>
                  </Link>
                </section>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default DestacadosApp;
