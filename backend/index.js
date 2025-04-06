// index.js
const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.post('/api/yandex/token', async (req, res) => {
  const { code } = req.body;

  try {
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: process.env.YANDEX_CLIENT_ID,
      client_secret: process.env.YANDEX_CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
    });

    const tokenResponse = await axios.post('https://oauth.yandex.com/token', params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const accessToken = tokenResponse.data.access_token;

    const userInfoResponse = await axios.get('https://login.yandex.ru/info?format=json', {
      headers: { Authorization: `OAuth ${accessToken}` },
    });

    const user = userInfoResponse.data;

    const appToken = jwt.sign({
      email: user.default_email,
      name: user.login,
      avatarId: user.default_avatar_id || null,
    }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('session_token', appToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch user info' });
  }
});

app.get('/api/session', (req, res) => {
  const token = req.cookies.session_token;
  if (!token) return res.json({ isLoggedIn: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({
      isLoggedIn: true,
      email: decoded.email,
      name: decoded.name,
      avatarId: decoded.avatarId,
    });
  } catch (err) {
    return res.json({ isLoggedIn: false });
  }
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('session_token', {
    httpOnly: true,
    secure: false, // change to true in production
    sameSite: 'Lax',
  });
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
