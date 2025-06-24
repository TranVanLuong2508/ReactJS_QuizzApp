import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux'
import Layout from './Layout';
import { store, persistor } from './redux/store';
import 'nprogress/nprogress.css'
import { PersistGate } from 'redux-persist/integration/react';
import i18n from './utils/i18n';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
