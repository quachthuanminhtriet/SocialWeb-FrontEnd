import React from 'react';
import { Navigate } from 'react-router-dom';
import sessions from "react-cookies";


const PrivateRoute = ({ children }) => {
  // Check if JWT exists in session storage (or local storage)
  const token = sessions.load('access-token'); 
  
  // Validate the token (you may need to implement a token validation function)
  const isTokenValid = () => {
    if (!token) return false;
    // Here, you might want to decode the token and check for its expiration, etc.
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000; // Convert expiration to milliseconds
      return Date.now() < exp;
    } catch (e) {
      return false;
    }
  };


  return isTokenValid() ? ( children ) : <Navigate to="/login" />;
};

export default PrivateRoute;
