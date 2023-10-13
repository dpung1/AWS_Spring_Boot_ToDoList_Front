import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

function AuthRouter({ element }) {

    const navigate = useNavigate();
    const loaction = useLocation();
    const pathname = loaction.pathname;
    const premitAllpath = ["/auth"];
    const [ elementState, setElementState ] = useState(<></>);

    useEffect(() => {
        const option = {
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        }
        axios.get("http://localhost:8080/authenticated", option)
        .then((response) => {
            for(let path of premitAllpath) {
                if(pathname.startsWith(path)) {
                    navigate("/");
                }
            }
        })
        .catch((error) => {
            let flag = false;

            for(let path of premitAllpath) {
                if(pathname.startsWith(path)) {
                    flag = true
                }
            }
            if(!flag) {
                navigate("/auth/signin");
            } 
        })
        .finally(() => {
            setElementState(element);
        })
    }, [elementState])

    return elementState;
}

export default AuthRouter;