// src/pages/Home.tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/userSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user);

  console.log(user)

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/api/logout', {}, { withCredentials: true });
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error('[Logout Error]', err);
    }
  };

  return (
    <div className='flex justify-between'>
      <h1>Главная</h1>
      <div className="flex items-center gap-3 mt-4">
        <Avatar>
          <AvatarImage
            src={
              user.avatarId
                ? `https://avatars.yandex.net/get-yapic/${user.avatarId}/islands-200`
                : undefined
            }
            alt={user.name || 'User'}
          />
          <AvatarFallback>
            {user.name?.[0]?.toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
        <p className="text-sm text-muted-foreground align-middle">{user.email}</p>
        <Button variant="secondary" size="sm" onClick={handleLogout}>
          Выйти
        </Button>
      </div>
    </div>
  );
};

export default Home;
