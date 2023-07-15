import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './styles/style.css';
import reportWebVitals from './reportWebVitals';

import { extendTheme, ChakraProvider } from '@chakra-ui/react';

const theme = extendTheme({
    colors : {
        palette : {
            1 : '#EEEEEE',
            2 : '#494F59',
            3 : '#393E46',
            4 : '#222831',
            5 : '#97FEED'
        }
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
        <App />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
