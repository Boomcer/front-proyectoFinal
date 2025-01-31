import React from 'react'
import "../css/CardProductApp.css";


export const PaginationApp = ({productsPerPage, totalProducts, currentPage, setCurrentPage}) => {


const pageNumbers = []

for(let i=1; i<= Math.ceil(totalProducts/productsPerPage); i++){
    pageNumbers.push(i)
}

const onSpecificPage = (n)=>{
    setCurrentPage(n)
}

    return (

    <nav 
        className="pagination is-centered mt-2" 
        role="navigation" 
        aria-label="pagination"
    >
        <ul className="pagination-list m-1">
            
            {pageNumbers.map(noPage =>(
                    
                    <li id="paginacion" key={noPage}>
                        <a  className={`pagination-link ${
                            noPage === currentPage ? 'is-current custom-highlight' : 'custom-default' 
                            }`}
                            onClick={()=> onSpecificPage(noPage)}
                        >
                            {noPage}
                        </a>
                    </li>                   
            ))}            
        </ul>
    </nav>
  );
};

export default PaginationApp