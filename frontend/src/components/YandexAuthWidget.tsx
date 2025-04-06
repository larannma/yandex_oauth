import { useEffect } from 'react';

const CLIENT_ID = 'b3ae99a4564a4da6a9b3599d0ab40d9c';
const REDIRECT_URI = 'http://localhost:5173/oauth/callback';

const YandexLoginButton = () => {
  useEffect(() => {
    if (window.YaAuthSuggest) {
      window.YaAuthSuggest.init({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        scope: 'login:email',
      }).then(({ handler }) => handler())
        .catch((error) => console.error('Ошибка при инициализации:', error));
    } else {
      console.error('YaAuthSuggest не загружен');
    }
  }, []);

  return (
    <div id="yandex-login-container"></div>
  );
};

export default YandexLoginButton;
