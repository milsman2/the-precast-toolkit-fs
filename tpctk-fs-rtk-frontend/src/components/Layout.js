import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className='flex flex-col max-h-screen'>
            <Header />
            <Outlet/>
            <Footer />
        </div>
    )
}

export default Layout