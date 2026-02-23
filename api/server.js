import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  const allowedOrigin = 'https://infinite-wallpapers.vercel.app';

  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

app.get('/', (req, res) => {
  res.json({ msg: 'api working' });
});

app.get('/api/wallpapers', async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;

    const unsplashUrl = `https://api.unsplash.com/topics/wallpapers/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&page=${page}&per_page=30`;

    const response = await fetch(unsplashUrl);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status || 500).json(data);
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ errors: ['Server error'] });
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
