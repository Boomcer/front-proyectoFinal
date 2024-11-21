import React, { useState, useEffect } from "react";
import { getProductos } from "../helpers/apiProductos.js";
import CardProductApp from "./CardProductApp.jsx";
import PaginationApp from "./PaginationApp.jsx";
import "./CardProductApp.css";
//import { useNavigate } from "react-router-dom";

const CarsProductApp = () => {
    
    // const navigate = useNavigate();
    const [productos, setProductos] = useState ([]);
    const [loading, setLoading] = useState(true);

    const [productsPerPage, setProductsPerPage] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const totalProductos = productos.length;
    const lastIndex = currentPage * productsPerPage
    const firstIndex = lastIndex - productsPerPage  

    useEffect(() => {
        traerProductos();
    },[]);

    const traerProductos = () =>{
            getProductos().then ((response) => {
            response?.productos
            setProductos(response.productos);
            setLoading(false);
            });
            };

    return(
            <>
            {loading? (
                <div id="ContenedorCards1" className="container p-3 bg-secondary">  
                <h3>Cargando Productos...</h3>
                </div>
            ) : (
            <div id="ContenedorCards2" className="container p-3 bg-secondary">
                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-3">
                {productos.map ((item) => ( 
                <CardProductApp 
                    key={item._id} 
                    producto={item}/>
                )).slice(firstIndex,lastIndex)}
                </div>
                <div>
                <PaginationApp 
                    productsPerPage={productsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalProducts={totalProductos}
                />
                </div>
            </div>
            )}
            </>
        );
    };
export default CarsProductApp;