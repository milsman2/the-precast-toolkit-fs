import Layout from './components/Layout';

import Home from './pages/home';
import ErrorPage from './pages/error-page';
import CastIronPage from './pages/cast-iron-page';

import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home />} />
        <Route path="/castiron/" element={<CastIronPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;