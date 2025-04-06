// index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/yandex/token', async (req, res) => {
  const { code } = req.body;

  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('client_id', process.env.YANDEX_CLIENT_ID);
    params.append('client_secret', process.env.YANDEX_CLIENT_SECRET);
    params.append('redirect_uri', process.env.REDIRECT_URI);

    const tokenResponse = await axios.post('https://oauth.yandex.com/token', params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const accessToken = tokenResponse.data.access_token;

    // Fetch user info
    const userInfoResponse = await axios.get('https://login.yandex.ru/info?format=json', {
      headers: {
        Authorization: `OAuth ${accessToken}`,
      },
    });

    const user = userInfoResponse.data;

    // Send back token and email (you can include more info)
    res.json({
      access_token: accessToken,
      email: user.default_email || user.emails?.[0] || null,
      login: user.login,
      first_name: user.first_name,
      last_name: user.last_name,
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch user info' });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
