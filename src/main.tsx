import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
      <ToastContainer />
    </ThemeProvider>
  </React.StrictMode>
);
