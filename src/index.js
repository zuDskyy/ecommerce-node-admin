import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux'
import {store, persistor} from './redux/store'
import { PersistGate } from 'redux-persist/integration/react';
import { DarkModeProvider } from './context/useThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <DarkModeProvider>
    <App />
    </DarkModeProvider>
    </PersistGate>
    
  </Provider >
);


