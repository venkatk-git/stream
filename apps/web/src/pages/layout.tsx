import Header from '../components/header';
import Footer from '../components/footer';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="h-dvh w-full px-8 py-2 flex flex-col bg-black-400 text-gray-200">
      <Header />
      <Outlet />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
