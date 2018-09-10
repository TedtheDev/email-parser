import React from 'react';
import styled from 'styled-components';

const ListItemLi = styled.li`
    display: grid;
    grid-template: 1fr / repeat(auto-fit,minmax(25%, 1fr));
    justify-items: center;
    align-items: center;
    padding: 0 .5rem;
    border: 1px solid black;
    &:last-child {
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
    }
`;

const ListItemDiv = styled.div`
    color: black;
    width: 100%;
    height: 100%;
    text-align: center;
    word-wrap: break-word;
    &:not(:last-child) {
        border-right: 1px solid black;
    }
`;

const ListItem = props => {
    return (
        <ListItemLi>
            <ListItemDiv>
                {props.data.to}
            </ListItemDiv>
            <ListItemDiv>
                {props.data.from}
            </ListItemDiv>
            <ListItemDiv>
                {props.data.date}
            </ListItemDiv>
            <ListItemDiv>
                {props.data.subject}
            </ListItemDiv>
        </ListItemLi>
    )
}

export default ListItem;