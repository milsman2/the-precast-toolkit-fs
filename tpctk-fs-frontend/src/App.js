import Home from './pages/home';
import AdminDashboard from './pages/admin';
import ErrorPage from './pages/error-page';
import Login from './pages/login';

import Layout from './components/Layout';

import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;