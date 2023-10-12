import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function AuthRouter({ element }) {

    const loaction = useLocation();
    const pathname = loaction.pathname;
    const premitAllpath = ["/auth"];

    useEffect(() => {
        const option = {
            headers: {
                Authorication: localStorage.getItem("acccessToken")
            }
        }
        axios.get("http://localhost:8080/auth/authenticated", option);
        
    }, [])

    return element
}

export default AuthRouter;