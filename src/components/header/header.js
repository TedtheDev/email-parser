import React from 'react';
import styled from 'styled-components';

const HeaderDiv = styled.div`
    text-align: center;
    color: ${props => props.theme.secondaryColor};
    font-size: 2rem;
    grid-area: ${props => props.gridArea || 'header'};
`;

const Header = props => {
    return (
        <HeaderDiv gridArea={props.gridArea}>{props.headerText || 'Header'}</HeaderDiv>
    )
}

export default Header;