import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import ListItem from './ListItem';

const TableListUl = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    border: 1px solid black;
`;

const TableListLi = styled.li`
    display: grid;
    grid-template: 1fr / repeat(5, 25%);
    justify-items: center;
    align-items: center;
`;

const HeaderDiv = styled.div`
    background-color: red;
    color: white;
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
                        if(field !== 'messageId') {
                            return <HeaderDiv key={`header-${field}`}>{capitalizeFirstLetter(field)}</HeaderDiv>
                        }
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
    headerFields: PropTypes.arrayOf(PropTypes.string)
}

export default TableList;