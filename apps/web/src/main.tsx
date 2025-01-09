import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './pages/app';
import AccountContextProvider from './contexts/account-context-provider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <AccountContextProvider>
      <App />
    </AccountContextProvider>
  </StrictMode>
);
