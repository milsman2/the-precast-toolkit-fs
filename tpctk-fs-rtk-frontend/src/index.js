import React from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import App from './App';
import { store } from './app/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { extendedApiSlice } from './features/castIrons/castIronSlice'

store.dispatch(extendedApiSlice.endpoints.getCastIrons.initiate());

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </StrictMode>,
);