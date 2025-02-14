import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './pages/app';

import AccountContextProvider from './contexts/account-context-provider';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from './components/toaster';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <AccountContextProvider>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </AccountContextProvider>
  </StrictMode>
);
