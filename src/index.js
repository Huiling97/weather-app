import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import './assets/styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { EntryContextProvider } from './store/entryContext';
import { ThemeContextProvider } from './store/themeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <EntryContextProvider>
        <App />
      </EntryContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
