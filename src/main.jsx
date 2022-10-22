import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';
import './index.css';

import './translation/i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <React.Suspense fallback="loading">
                    <App />
                </React.Suspense>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
