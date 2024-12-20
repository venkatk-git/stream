import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SocketIo from './socket.io';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <a href="http://localhost:8080/auth/google">Login with Google</a>
          }
        />
        <Route path="/connectSocket" element={<SocketIo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
