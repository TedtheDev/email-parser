import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        return (
            <form onSubmit={this.onSubmitFileUpload}>
                <input id="file-upload" type="file" multiple onChange={this.onChangeFileUpload} />
                <label htmlFor='file-upload'>Upload Files</label>
                {
                    this.state.showUploadButton && <button type="submit">Upload</button>
                }
            </form>
        )
    }
}

FileUpload.propTypes = {
    fileUploadRequest: PropTypes.func.isRequired
}

export default FileUpload;