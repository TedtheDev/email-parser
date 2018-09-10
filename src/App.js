import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Header from './components/header/header';
import FileUpload from './components/fileUpload/FileUpload';
import TableList from './components/table/TableList'

const AppDiv = styled.div`
  background: ${props => props.theme.primaryColor};
  height: 100%;
  width: 100%;
  display: grid;
  color: ${props => props.theme.secondaryColor}
  grid-template: 10% 1fr 10% / 10% 1fr 10%;
  grid-template-areas:
    "header header header"
    ". content ."
    "footer footer footer";
  
`;

const ContentDiv = styled.div`
  display: flex;
  grid-area: content;
  flex-direction: column;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { emailData: {}, loading: false };
  }

  fileUploadRequest = formData => {
    axios.post('/api/upload/mail', formData, {headers: {"Content-Type":"multipart/form-data"}})
            .then(response => {
                this.setState({ loading: false, emailData: response.data.data })
            })
            .catch(err => console.log(err));
  }

  render() {
    return (
      <AppDiv>
        <Header 
          gridArea='header' 
          headerText="Email Parser"
        />
        <ContentDiv>
          <FileUpload 
            fileUploadRequest={this.fileUploadRequest}
          />
          <TableList
            data={this.state.emailData}
            loading={this.state.loading}
          />
        </ContentDiv>
      </AppDiv>
    );
  }
}

export default App;
