import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SocketIo from './socket.io';
import { Home } from './home';

export function App() {
  return (
    <div className="h-dvh w-full bg-black-400 text-gray-200">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connectSocket" element={<SocketIo />} />
          <Route path="/r" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
