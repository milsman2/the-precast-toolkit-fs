import DashboardHeader from '../DashboardHeader';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className='flex flex-col max-h-screen'>
            <DashboardHeader />
            <Outlet/>
            <Footer />
        </div>
    )
}

export default Layout