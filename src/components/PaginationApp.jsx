import React from 'react'

const PaginationApp = ({productsPerPage, totalProducts, currentPage, setCurrentPage}) => {


const pageNumbers = []

for(let i=1; i<= Math.ceil(totalProducts/productsPerPage); i++){
    pageNumbers.push(i)
}

const onPreviusPage = ()=>{
    setCurrentPage(currentPage-1)
}

const onNextPage = ()=>{
    setCurrentPage(currentPage+1)
}

const onSpecificPage = (n)=>{
    setCurrentPage(n)
}

    return (

    <nav 
        className="pagination is-centered mb-6" 
        role="navigation" 
        aria-label="pagination"
    >
        <a className={`pagination-previous ${currentPage === 1 ? 'is-disabled' : ''}`} onClick={onPreviusPage}>Anterior</a>
        <a className={`pagination-next ${currentPage >= pageNumbers.length ? 'is-disabled' : ''}`} onClick={onNextPage}>Siguiente</a>
        <ul className="pagination-list">
            
            {pageNumbers.map(noPage =>(
                    <li key={noPage}>
                        <a className={`pagination-link ${
                            noPage=== currentPage ? 'is-current' : '' 
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