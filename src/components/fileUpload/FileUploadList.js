import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Li = styled.li`
    list-style: none;
    border: 1px solid ${props => props.theme.secondaryColor};
    padding: .5rem;
    border-radius: 3px;
`;

const Ul = styled.ul`

`;

const FileUploadList = props => {
    console.log('listItems', props.listItems)
    return (
        <Ul>
            {
                props.listItems.map(item => {
                    return <Li>{item.name}</Li>
                })
            }
        </Ul>
    )
}

FileUploadList.propTypes = {
    listItems: PropTypes.array.isRequired
}

export default FileUploadList;