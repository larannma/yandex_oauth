import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import OauthCallback from './pages/OauthCallback';
import Layout from './components/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { login } from './store/userSlice';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // add loading state

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/session', {
          withCredentials: true,
        });

        if (res.data.isLoggedIn) {
          dispatch(login({
            accessToken: 'cookie',
            email: res.data.email,
            name: res.data.name,
            avatarId: res.data.avatarId,
          }));
        }
      } catch (err) {
        console.error('[Session] Failed to load:', err);
      } finally {
        setLoading(false); // done checking session
      }
    };

    restoreSession();
  }, [dispatch]);

  if (loading) {
    return <div className="p-10 text-center">🔐 Проверка сессии...</div>;
  }
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <Layout>
            <Login />
          </Layout>
        } />
        <Route path="/oauth/callback" element={<OauthCallback />} />
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
