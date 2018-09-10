import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const theme = {
    primaryColor: 'rgb(255, 150, 150)',
    secondaryColor: 'rgb(239, 239, 239)'
}
ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
    document.getElementById('root')
);

registerServiceWorker();