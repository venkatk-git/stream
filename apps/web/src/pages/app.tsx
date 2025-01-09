import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './home';
import PrivateRoute from '../components/private-route';

export function App() {
  return (
    <div className="h-dvh w-full bg-black-400 text-gray-200">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateRoute />}>
            <Route path="/r" />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
