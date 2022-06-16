import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className='flex flex-col h-screen'>
            <Header />
            <Outlet className='flex flex-col flex-1'/>
            <Footer />
        </div>
    )
}

export default Layout