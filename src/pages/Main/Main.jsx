import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as S from "./Style"
import axios from 'axios';
import { useQuery } from 'react-query';
import jwt_decode from 'jwt-decode';

function Main(props) {
    const [ content, setContent ] = useState();
    const [ updateToDoState, setUpdateToDoState ] = useState(0);
    const [ updateContent, setUpdateContent ] = useState("")
    const [ username, setUsername ] = useState("")

    const todoList = useQuery(["todoList"], async () => {
        const option = {
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        }

        let decode = jwt_decode(option.headers.Authorization.substring(7))
        setUsername(decode.email)

        try {
            const response = await axios.get("http://localhost:8080/todo/list", option)
            return response
        } catch(error) {
            console.error(error)
        }
    })

    const ContentInputOnchange = (e) => {
        setContent(e.target.value);
    }

    const ToDoAddOnClick = async () => {
        const option = {
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        }

        try {
            await axios.post("http://localhost:8080/todo", {content}, option);
            alert("ToDo 추가 완료!!")
            todoList.refetch();
        } catch(error) {
            console.error(error)
        }
    }

    const DeleteToDoOnClick = async (todoId) => {
        const option = {
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        }

        try {
            await axios.delete(`http://localhost:8080/todo/${todoId}`, option);
            alert("ToDo 삭제 완료!!")
            todoList.refetch();
        } catch(error) {
            console.error(error)
        }
    }

    const UpdateContentInputOnChange = (e) => {
        setUpdateContent(e.target.value)
    }

    const UpdateToDoSubmitOnCliCk = async (todoId) => {
        const option = {
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        }

        try {
            await axios.put(`http://localhost:8080/todo/${todoId}`, {updateContent}, option);
            alert("ToDo 수정 완료")
            todoList.refetch();
        } catch(error) {
            console.error(error)
        }
    }

    return (
        <div css={S.SContainer}>
            <h1 css={S.SHeader}>ToDoList</h1>
            <div>User : {username} </div>
            <div>
                <div css={S.SAddToDoBox}>
                    <input type='text' name='text' placeholder='ToDo' onChange={ContentInputOnchange}/>
                    <button css={S.SButton} onClick={ToDoAddOnClick}>ToDo 추가</button>
                </div>
            </div>
            <ul>
                {todoList.isLoading ? "" : todoList?.data?.data.map(todo => 
                    <li key={todo.todoId}> 할일 : {todo.content}
                        {
                            updateToDoState === todo.todoId && (
                                <>
                                    <input type='text'  css={S.SUpdateInput} value={updateContent} onChange={UpdateContentInputOnChange}/>
                                    <button css={S.SButton} onClick={() => {
                                        if(todo.content !== updateContent) {
                                            UpdateToDoSubmitOnCliCk(todo.todoId)
                                        }
                                        setUpdateToDoState(0); 
                                        setUpdateContent("");
                                        }}>확인</button>
                                </>
                            )
                        }
                        {
                            updateToDoState !== todo.todoId 
                            ? <button css={S.SUpdateButton} onClick={() => { 
                                setUpdateToDoState(todo.todoId);
                                setUpdateContent(todo.content);
                            }}>수정</button>

                            : <button css={S.SButton} onClick={() => { 
                                setUpdateToDoState(0); 
                                setUpdateContent("");
                            }}>취소</button>
                        }
                        <button css={S.SDeleteButton} onClick={() => {DeleteToDoOnClick(todo.todoId)}}>삭제</button>
                    </li>
                )} 
            </ul>
        </div>
    );
}

export default Main;