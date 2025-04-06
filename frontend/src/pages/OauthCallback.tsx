import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';

const OauthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      console.log('[OAuth] Received code:', code);

      const fetchToken = async () => {
        try {
          // After token exchange

          const response = await axios.post(
            'http://localhost:3001/api/yandex/token',
            { code },
            { withCredentials: true }
          );
          
          // Then fetch session data
          const sessionRes = await axios.get('http://localhost:3001/api/session', {
            withCredentials: true,
          });
          
          if (sessionRes.data.isLoggedIn) {
            dispatch(login({
              accessToken: 'cookie',
              email: sessionRes.data.email,
              name: sessionRes.data.name,
              avatarId: sessionRes.data.avatarId,
            }));
            navigate('/');
          }

        } catch (err) {
          console.error('[OAuth] Token exchange failed:', err.response?.data || err.message);
        }
      };

      fetchToken();
    } else {
      console.warn('[OAuth] No code found in URL.');
    }
  }, [code, navigate]);

  return <div>Authorizing...</div>;
};


export default OauthCallback;
