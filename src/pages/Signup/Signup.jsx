import axios from 'axios';
import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as S from "./Style"


function Signup(props) {

    const [ signupUser, setSingupUser ] = useState({
        email: "",
        password: "",
        name: ""
    })
    
    const SignupInputOnchange = (e) => {
        const { name, value } = e.target;
    
        setSingupUser({
            ...signupUser,
            [name]: value
        })
    }
    
    const SingupSubmitOnClick = async () => {
        try {
            await axios.post("http://localhost:8080/auth/signup", signupUser);
            alert("회원가입 성공!!")
            window.location.replace("/auth/signin")
        } catch(error) {
            const responseErrors = error.response.data;
            const keys = Object.keys(responseErrors);  
        
            if(keys.includes("email")) {
                alert(responseErrors.email);
            } else if(keys.includes("password")) {
                alert(responseErrors.password);
            } else if(keys.includes("name")) {
                alert(responseErrors.name)
            } else {
                alert("회원가입 실패!!")
            }
        }
    }
    return (
        <div css={S.SContainer}>
            <h1 css={S.SHeader}>회원가입 페이지</h1>
            <div css={S.SInputBox}>
                <input type='text' name='email' placeholder='이메일' onChange={SignupInputOnchange}/>
            </div>
            <div css={S.SInputBox}>
                <input type='password' name='password' placeholder='비밀번호' onChange={SignupInputOnchange}/>
            </div>
            <div css={S.SInputBox}>
                <input type='text' name='name' placeholder='이름' onChange={SignupInputOnchange}/>
            </div>
            <div css={S.SButtonBox}>
                <button onClick={SingupSubmitOnClick}>가입하기</button>
            </div>
        </div>
    );
}

export default Signup;