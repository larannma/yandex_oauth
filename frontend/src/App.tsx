import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import OauthCallback from './pages/OauthCallback';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const App = () => {
  // const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <Router>
      <Routes>
        {/* Public route (but styled) */}
        <Route path="/login" element={
          <Layout>
            <Login />
          </Layout>
        } />

        {/* No layout for this (redirect logic only) */}
        <Route path="/oauth/callback" element={<OauthCallback />} />

        {/* Protected and styled route */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;
