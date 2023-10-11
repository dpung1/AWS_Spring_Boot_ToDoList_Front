import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as S from "./Style"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Singin(props) {
    const navigate = useNavigate();

    const [ signinUser, setSigninUser ] = useState({
        email: "",
        password: ""
    })
    
    const SigninInputOnchange = (e) => {
        const { name, value } = e.target;
    
        setSigninUser({
            ...signinUser,
            [name]: value
        })
    }
    
    const SinguinSubmitOnClick = async () => {
        try {
            const response = await axios.post("http://localhost:8080/auth/signin", signinUser);
            console.log(response);
            localStorage.setItem("accessToken", "Bearer " + response.data);
            alert("로그인 성공!!");
            navigate("/")
        } catch(error) {
            const responseErrors = error.response.data;
            const keys = Object.keys(responseErrors)
            
            if(keys.includes("errorMessage")) {
                alert(responseErrors.errorMessage)
            } else {
                alert("로그인 실패!!")
            }
            
        }
    }

    return (
        <div css={S.SContainer}>
            <h1 css={S.SHeader}>로그인 페이지</h1>
            <div css={S.SInputBox}>
                <input type='text' name='email' placeholder='이메일' onChange={SigninInputOnchange}/>
            </div>
            <div css={S.SInputBox}>
                <input type='password' name='password' placeholder='비밀번호' onChange={SigninInputOnchange}/>
            </div>
            <div css={S.SButtonBox}>
                <button onClick={SinguinSubmitOnClick}>로그인</button>
            </div>
        </div>
    );
}

export default Singin;