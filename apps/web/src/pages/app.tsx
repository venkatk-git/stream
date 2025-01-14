import { Route, Routes } from 'react-router-dom';

import { Home } from './home';
import Layout from './layout';
import PrivateRoute from '../components/private-route';
import RoomPage from './room';
import RoomContextProvider from '../contexts/room-context-provider';

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
                <RoomContextProvider>
                  <RoomPage />
                </RoomContextProvider>
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
