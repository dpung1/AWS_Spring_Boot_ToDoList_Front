import { css } from "@emotion/react";

export const SContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin: 50px auto;
    border: 1px solid #dbdbdb;
    width: 650px;
    height: 850px;
`;

export const SHeader = css`
    font-size: 25px;
    padding: 5px;
`;

export const SAddToDoBox = css`
    padding: 5px;
`;

export const SUpdateInput = css`
    margin: 5px;
`;

export const SButton = css`
    margin: 5px;
`;

export const SDeleteButton = css`
    margin: 5px;
    background-color: red;
    color: white;
`;

export const SUpdateButton = css`
    margin: 5px;
    background-color: green;
    color: white;
`;