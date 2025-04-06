import { Button } from '@/components/ui/button';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

const CLIENT_ID = 'b3ae99a4564a4da6a9b3599d0ab40d9c';
const REDIRECT_URI = 'http://localhost:5173/oauth/callback';

const Login = () => {
  const user = useSelector((state: RootState) => state.user);

  const handleLogin = () => {
    const authUrl = `https://oauth.yandex.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = authUrl;
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col items-start justify-center px-10 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 bg-repeat pointer-events-none z-0" />

      {/* Title */}
      <h1 className="text-[150px] leading-none font-black mb-6 z-10">
        Войти через Яндекс
      </h1>

      {/* Login Button */}
      {!user.isLoggedIn && (
        <div className="z-10">
          <Button className="px-8 py-4 text-lg" onClick={handleLogin}>
            Войти
          </Button>
        </div>
      )}

      {/* Already logged in state (optional) */}
      {user.isLoggedIn && (
        <p className="text-lg text-gray-700 mt-4 z-10">
          Вы уже вошли как <strong>{user.email || 'Пользователь'}</strong>
        </p>
      )}
    </div>
  );
};

export default Login;
