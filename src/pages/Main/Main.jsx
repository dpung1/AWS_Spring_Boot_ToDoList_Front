import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as S from "./Style"

function Main(props) {
    return (
        <div css={S.SContainer}>
            <h1 css={S.SHeader}>ToDoList</h1>
            <div>
                <div css={S.SInputBox}>
                    <input type='text' name='text' placeholder='ToDo' />
                </div>
                <div css={S.SButtonBox}>
                    <button>ToDo 추가</button>
                </div>
            </div>
            <ul>
                <li>

                </li>
            </ul>
        </div>
    );
}

export default Main;