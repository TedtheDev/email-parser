import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FileUploadList from './FileUploadList';

const FileUploadButton = styled.button`
    background: ${props => props.theme.primaryColor};
    color: ${props => props.theme.secondaryColor};
    padding: 1rem;
    border: 5px solid ${props => props.theme.secondaryColor};
    border-radius: 5px;
    font-size: 1.4rem;
    cursor: pointer;
`;

const FileUploadInput = styled.input`
    opacity: 0;
`;

const FileUploadLabal = styled.label`
    display: block;
    padding: .5rem;
    font-size: 1.3rem;
    cursor: pointer;
    background: ${props => props.theme.primaryColor};
    border: 5px solid white;
    color: white;
    border-radius: 10px;
    text-align: center;
`;

class FileUpload extends Component {
    constructor(props) {
        super(props);

        this.state = { files: [], showUploadButton: false };
    }

    onSubmitFileUpload = event => {
        event.preventDefault();
        let formData = new FormData();
        for(let i = 0; i < this.state.files.length; i++) {
            formData.append('files', this.state.files[i]);
        }
        
        this.props.fileUploadRequest(formData);
        
    }

    onChangeFileUpload = (event) => {
        this.setState({files: event.target.files, showUploadButton: true});
    }

    render() {
        console.log(this.state.files)
        return (
            <form onSubmit={this.onSubmitFileUpload}>
                <FileUploadInput id="file-upload" type="file" multiple onChange={this.onChangeFileUpload} />
                <FileUploadLabal htmlFor='file-upload'>Upload Files</FileUploadLabal>
                {
                    this.state.files.length > 0 && <FileUploadList listItems={Array.from(this.state.files)} />
                }
                {
                    this.state.showUploadButton && <FileUploadButton type="submit">Parse!</FileUploadButton>
                }
            </form>
        )
    }
}

FileUpload.propTypes = {
    fileUploadRequest: PropTypes.func.isRequired
}

export default FileUpload;