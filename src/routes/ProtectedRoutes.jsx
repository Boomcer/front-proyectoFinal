import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoutes = ({children}) => {
  
    const isAdmin = JSON.parse(localStorage.getItem("auth")) || null;
    
    if (isAdmin === "admin"){
        return children;
    } else {
        return <Navigate to="/" />;
    };
};

export default ProtectedRoutes;