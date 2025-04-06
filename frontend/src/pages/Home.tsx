// src/pages/Home.tsx
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h1>Главная</h1>
      <div className="flex flex-col items-center justify-center min-h-svh">
        <Button onClick={() => {
          navigate('/login')
        }}>Страница логина</Button>
        <Button onClick={handleLogout}>Выйти</Button>
      </div>
    </div>
  );
};

export default Home;
