import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import ListItem from './ListItem';

const TableListUl = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    padding: .5rem;
    border: 10px solid ${props => props.theme.secondaryColor};
    background: ${props => props.theme.secondaryColor};
    border-radius: 5px;
`;

const TableListLi = styled.li`
    display: grid;
    grid-template: 1fr / repeat(5, 20%);
    justify-items: center;
    align-items: center;
    padding: 0 .5rem;
    border: 5px solid ${props => props.theme.primaryColor};
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    background-color: ${props => props.theme.primaryColor};
`;

const HeaderDiv = styled.div`
    color: white;
    font-size: 1.3rem;
    width: 100%;
    height: 100%;
    text-align: center;
    &:not(:last-child) {
        border-right: 1px solid white;
    }
`;

const capitalizeFirstLetter = word => {
    return word[0].toUpperCase() + word.substring(1);
}

const TableList = props => {

    if(props.loading) {
        return <div>Loading...</div>
    }
    
    if(props.data === undefined || Object.keys(props.data).length === 0) {
        return (
            <div></div>
        )
    }

    return (
        <TableListUl>
            <TableListLi>
                {
                    Object.keys(props.data[0]).map(field => {
                        //if(field !== 'messageId') {
                            return <HeaderDiv key={`header-${field}`}>{capitalizeFirstLetter(field)}</HeaderDiv>
                        //}
                        //return null;
                    })
                }
            </TableListLi>
            {props.data.map(record => {
                return <ListItem key={record.messageId} data={record} />
            })}
        </TableListUl>
    )
}

TableList.propTypes = {
    data: PropTypes.array
}

export default TableList;