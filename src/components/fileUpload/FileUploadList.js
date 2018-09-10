import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Li = styled.li`
    padding: .3rem 0;
    margin: 0;
    font-size: .8rem;
`;

const Ul = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    height: 0;
    opacity: 0;
    transition: all .3s ease-in;
    z-index: -1;
`;

const FileUploadListDiv = styled.div`
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
`;



const FileUploadFileNamesDiv = styled.div`
    font-size: .8rem;
    color: ${props => props.theme.secondaryColor};
    border-bottom: 0px solid ${props => props.theme.secondaryColor};
    width: 100%;
    position: relative;
    overflow: hidden;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: ${props => props.theme.secondaryColor};
        transform: translateX(-100%);
        transition: transform .2s ease-in-out;
    }

    &:hover::after {
        transform: translateX(0);
    }

    &:hover + ${Ul} {
        height: 100%;
        opacity: 1;
        z-index: 1;
    }
`;

const FileUploadTextSpan = styled.span`
    cursor: pointer;
    
    &:hover ~ ${FileUploadFileNamesDiv}::after {
        transform: translateX(0);
    }

    &:hover ~ ${Ul} {
        height: 100%;
        opacity: 1;
        z-index: 1;
    }
`;

const FileUploadList = props => {
    return (
        <FileUploadListDiv>
            <FileUploadFileNamesDiv>
                <FileUploadTextSpan>&#43; Filenames</FileUploadTextSpan>
            </FileUploadFileNamesDiv>
            <Ul>
                {
                    props.listItems.map(item => {
                        return <Li>{item.name}</Li>
                    })
                }
            </Ul>
        </FileUploadListDiv>
    )
}

FileUploadList.propTypes = {
    listItems: PropTypes.array.isRequired
}

export default FileUploadList;