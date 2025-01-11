import { Route, Routes } from 'react-router-dom';

import { Home } from './home';
import Layout from './layout';
import PrivateRoute from '../components/private-route';

export function App() {
  return (
    <div className="h-dvh w-full bg-black-400 text-gray-200">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route element={<PrivateRoute />}>
            <Route path="/r/:roomid" element={<h1>Room Page</h1>} />
          </Route>
          <Route path="*" element={<h1>Page not found</h1>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
