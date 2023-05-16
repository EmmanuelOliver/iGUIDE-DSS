import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CounselingSessionsContextProvider } from './context/counselingsessionContext';
import { AuthContextProvider } from './context/authenticateContext';
import { UserContextProvider } from './context/userContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <UserContextProvider
    >
     <CounselingSessionsContextProvider>
      <App />
    </CounselingSessionsContextProvider>
    </UserContextProvider>
 </AuthContextProvider>
  </React.StrictMode>
);





