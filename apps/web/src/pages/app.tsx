import { Route, Routes } from 'react-router-dom';

import Layout from './layout';

import { Home } from './home';
import RoomPage from './room';

import PrivateRoute from '../components/private-route';

import RoomContextProvider from '../contexts/room-context-provider';
import SocketContextProvider from '../contexts/socket-context-provider';
import PlayerContextProvinder from '../contexts/player-context-provider';

export function App() {
  return (
    <div className="h-dvh w-full bg-black-400 text-gray-200 transition-all">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route element={<PrivateRoute />}>
            <Route
              path="/r/:roomId"
              element={
                <SocketContextProvider>
                  <RoomContextProvider>
                    <PlayerContextProvinder>
                      <RoomPage />
                    </PlayerContextProvinder>
                  </RoomContextProvider>
                </SocketContextProvider>
              }
            />
          </Route>
          <Route path="*" element={<h1>Page not found</h1>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
